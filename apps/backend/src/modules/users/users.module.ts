import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersUseCases } from './application/use-cases/users.use-cases';
@Module({ controllers: [UsersController], providers: [UsersUseCases], exports: [UsersUseCases] })
export class UsersModule {}
