import { Module } from '@nestjs/common';
import { IAuditRepository } from './domain/auditLog.repository';
import { PrismaAuditRepository } from './infrastructure/repositories/prisma-auditLog.repository';
import { AuditUseCases } from './application/use-cases/auditLog.use-cases';
import { AuditController } from './presentation/controllers/auditLog.controller';
@Module({ providers: [{ provide: IAuditRepository, useClass: PrismaAuditRepository }, AuditUseCases], controllers: [AuditController], exports: [AuditUseCases] })
export class AuditModule {}
