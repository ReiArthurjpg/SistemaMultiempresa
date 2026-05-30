import { Module } from '@nestjs/common';
import { IPlansRepository } from './domain/plan.repository';
import { PrismaPlansRepository } from './infrastructure/repositories/prisma-plan.repository';
import { PlansUseCases } from './application/use-cases/plan.use-cases';
import { PlansController } from './presentation/controllers/plan.controller';
@Module({ providers: [{ provide: IPlansRepository, useClass: PrismaPlansRepository }, PlansUseCases], controllers: [PlansController], exports: [PlansUseCases] })
export class PlansModule {}
