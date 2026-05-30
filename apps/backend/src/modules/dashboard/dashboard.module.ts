import { Module } from '@nestjs/common';
import { DashboardUseCases } from './application/use-cases/dashboard.use-cases';
import { DashboardController } from './presentation/controllers/dashboard.controller';
@Module({ providers: [DashboardUseCases], controllers: [DashboardController] })
export class DashboardModule {}
