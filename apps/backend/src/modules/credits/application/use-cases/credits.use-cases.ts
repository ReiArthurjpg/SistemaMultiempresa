import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../../../common/prisma/prisma.service';
@Injectable()
export class CreditsUseCases {
  constructor(private prisma: PrismaService, private events: EventEmitter2) {}
  async balance(companyId: string) { return this.prisma.credit.upsert({ where: { companyId }, update: {}, create: { companyId, balance: 0 } }); }
  ledger(companyId: string, take=50, cursor?: string) { return this.prisma.creditTransaction.findMany({ where: { companyId }, take, ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}), orderBy: { createdAt: 'desc' } }); }
  async operate(input: { companyId: string; userId?: string; amount: number; transactionType: 'ADD'|'USE'|'REFUND'|'TRANSFER'; description: string }) {
    return this.prisma.$transaction(async (tx) => {
      const current = await tx.credit.upsert({ where: { companyId: input.companyId }, update: {}, create: { companyId: input.companyId, balance: 0 } });
      const signed = ['ADD','REFUND'].includes(input.transactionType) ? input.amount : -input.amount;
      const next = Number(current.balance) + signed;
      if (next < 0) throw new BadRequestException('Saldo insuficiente: o ledger não permite saldo negativo.');
      const credit = await tx.credit.update({ where: { companyId: input.companyId }, data: { balance: next } });
      const transaction = await tx.creditTransaction.create({ data: { companyId: input.companyId, userId: input.userId, amount: input.amount, transactionType: input.transactionType, description: input.description } });
      await tx.auditLog.create({ data: { companyId: input.companyId, userId: input.userId, action: `CREDIT_${input.transactionType}`, entity: 'credit_transactions', entityId: transaction.id } });
      this.events.emit(`credits.${input.transactionType.toLowerCase()}`, transaction);
      return { credit, transaction };
    });
  }
}
