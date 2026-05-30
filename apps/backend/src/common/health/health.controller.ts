import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { PrismaService } from '../prisma/prisma.service';
@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}
  @Public() @Get() @ApiOkResponse({ example: { status: 'ok' } }) health() { return { status: 'ok', service: 'nexora-backend' }; }
  @Public() @Get('database') async database() { await this.prisma.$queryRaw`SELECT 1`; return { status: 'ok' }; }
  @Public() @Get('redis') redis() { return { status: 'ok', mode: 'ready-for-redis' }; }
  @Public() @Get('../metrics') metrics() { return '# Nexora metrics endpoint ready for OpenTelemetry/Prometheus\n'; }
}
