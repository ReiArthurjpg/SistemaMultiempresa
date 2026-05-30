import { Module } from '@nestjs/common';
import { ICompaniesRepository } from './domain/company.repository';
import { PrismaCompaniesRepository } from './infrastructure/repositories/prisma-company.repository';
import { CompaniesUseCases } from './application/use-cases/company.use-cases';
import { CompaniesController } from './presentation/controllers/company.controller';
@Module({ providers: [{ provide: ICompaniesRepository, useClass: PrismaCompaniesRepository }, CompaniesUseCases], controllers: [CompaniesController], exports: [CompaniesUseCases] })
export class CompaniesModule {}
