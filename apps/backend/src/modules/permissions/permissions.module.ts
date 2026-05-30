import { Module } from '@nestjs/common';
import { IPermissionsRepository } from './domain/permission.repository';
import { PrismaPermissionsRepository } from './infrastructure/repositories/prisma-permission.repository';
import { PermissionsUseCases } from './application/use-cases/permission.use-cases';
import { PermissionsController } from './presentation/controllers/permission.controller';
@Module({ providers: [{ provide: IPermissionsRepository, useClass: PrismaPermissionsRepository }, PermissionsUseCases], controllers: [PermissionsController], exports: [PermissionsUseCases] })
export class PermissionsModule {}
