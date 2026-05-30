import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardUseCases } from '../../application/use-cases/dashboard.use-cases';
@ApiTags('Dashboard') @ApiBearerAuth() @Controller('dashboard')
export class DashboardController { constructor(private dashboard: DashboardUseCases) {} @Get() @ApiOkResponse({ description: 'Indicadores iniciais do SaaS.' }) summary(){ return this.dashboard.summary(); } }
