import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { IPlansRepository } from '../../domain/plan.repository';
@Injectable()
export class PrismaPlansRepository implements IPlansRepository {
  constructor(private readonly prisma: PrismaService) {}
  list(params: { take?: number; cursor?: string; companyId?: string } = {}) { return (this.prisma as any).plan.findMany({ take: params.take ?? 25, ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}), where: { deletedAt: null, ...(params.companyId ? { companyId: params.companyId } : {}) }, orderBy: { createdAt: 'desc' } }); }
  get(id: string) { return (this.prisma as any).plan.findUnique({ where: { id } }); }
  create(data: Record<string, unknown>) { return (this.prisma as any).plan.create({ data }); }
  update(id: string, data: Record<string, unknown>) { return (this.prisma as any).plan.update({ where: { id }, data }); }
}
