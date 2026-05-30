import { Module } from '@nestjs/common';
import { IMenusRepository } from './domain/menu.repository';
import { PrismaMenusRepository } from './infrastructure/repositories/prisma-menu.repository';
import { MenusUseCases } from './application/use-cases/menu.use-cases';
import { MenusController } from './presentation/controllers/menu.controller';
@Module({ providers: [{ provide: IMenusRepository, useClass: PrismaMenusRepository }, MenusUseCases], controllers: [MenusController], exports: [MenusUseCases] })
export class MenusModule {}
