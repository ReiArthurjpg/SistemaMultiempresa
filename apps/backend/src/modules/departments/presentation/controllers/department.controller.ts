import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DepartmentsUseCases } from '../../application/use-cases/department.use-cases';
import { CreateDepartmentsDto, UpdateDepartmentsDto } from '../dtos/department.dto';
@ApiTags('Departments')
@ApiBearerAuth()
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly useCases: DepartmentsUseCases) {}
  @Get() @ApiOkResponse({ description: 'Lista paginada cursor-based.' }) list(@Query('take') take?: string, @Query('cursor') cursor?: string) { return this.useCases.list({ take: take ? Number(take) : 25, cursor }); }
  @Get(':id') @ApiOkResponse({ description: 'Registro encontrado.' }) get(@Param('id') id: string) { return this.useCases.get(id); }
  @Post() @ApiCreatedResponse({ description: 'Registro criado.' }) create(@Body() dto: CreateDepartmentsDto) { return this.useCases.create(dto as any); }
  @Patch(':id') @ApiOkResponse({ description: 'Registro atualizado.' }) update(@Param('id') id: string, @Body() dto: UpdateDepartmentsDto) { return this.useCases.update(id, dto as any); }
}
