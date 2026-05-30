import { Module } from '@nestjs/common';
import { IDepartmentsRepository } from './domain/department.repository';
import { PrismaDepartmentsRepository } from './infrastructure/repositories/prisma-department.repository';
import { DepartmentsUseCases } from './application/use-cases/department.use-cases';
import { DepartmentsController } from './presentation/controllers/department.controller';
@Module({ providers: [{ provide: IDepartmentsRepository, useClass: PrismaDepartmentsRepository }, DepartmentsUseCases], controllers: [DepartmentsController], exports: [DepartmentsUseCases] })
export class DepartmentsModule {}
