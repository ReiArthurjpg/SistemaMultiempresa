import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompaniesUseCases } from '../../application/use-cases/company.use-cases';
import { CreateCompaniesDto, UpdateCompaniesDto } from '../dtos/company.dto';
@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly useCases: CompaniesUseCases) {}
  @Get() @ApiOkResponse({ description: 'Lista paginada cursor-based.' }) list(@Query('take') take?: string, @Query('cursor') cursor?: string) { return this.useCases.list({ take: take ? Number(take) : 25, cursor }); }
  @Get(':id') @ApiOkResponse({ description: 'Registro encontrado.' }) get(@Param('id') id: string) { return this.useCases.get(id); }
  @Post() @ApiCreatedResponse({ description: 'Registro criado.' }) create(@Body() dto: CreateCompaniesDto) { return this.useCases.create(dto as any); }
  @Patch(':id') @ApiOkResponse({ description: 'Registro atualizado.' }) update(@Param('id') id: string, @Body() dto: UpdateCompaniesDto) { return this.useCases.update(id, dto as any); }
}
