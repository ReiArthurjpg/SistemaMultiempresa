import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuditUseCases } from '../../application/use-cases/auditLog.use-cases';
import { CreateAuditDto, UpdateAuditDto } from '../dtos/auditLog.dto';
@ApiTags('Audit')
@ApiBearerAuth()
@Controller('audit')
export class AuditController {
  constructor(private readonly useCases: AuditUseCases) {}
  @Get() @ApiOkResponse({ description: 'Lista paginada cursor-based.' }) list(@Query('take') take?: string, @Query('cursor') cursor?: string) { return this.useCases.list({ take: take ? Number(take) : 25, cursor }); }
  @Get(':id') @ApiOkResponse({ description: 'Registro encontrado.' }) get(@Param('id') id: string) { return this.useCases.get(id); }
  @Post() @ApiCreatedResponse({ description: 'Registro criado.' }) create(@Body() dto: CreateAuditDto) { return this.useCases.create(dto as any); }
  @Patch(':id') @ApiOkResponse({ description: 'Registro atualizado.' }) update(@Param('id') id: string, @Body() dto: UpdateAuditDto) { return this.useCases.update(id, dto as any); }
}
