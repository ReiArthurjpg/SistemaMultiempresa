import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsUseCases } from '../../application/use-cases/permission.use-cases';
import { CreatePermissionsDto, UpdatePermissionsDto } from '../dtos/permission.dto';
@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly useCases: PermissionsUseCases) {}
  @Get() @ApiOkResponse({ description: 'Lista paginada cursor-based.' }) list(@Query('take') take?: string, @Query('cursor') cursor?: string) { return this.useCases.list({ take: take ? Number(take) : 25, cursor }); }
  @Get(':id') @ApiOkResponse({ description: 'Registro encontrado.' }) get(@Param('id') id: string) { return this.useCases.get(id); }
  @Post() @ApiCreatedResponse({ description: 'Registro criado.' }) create(@Body() dto: CreatePermissionsDto) { return this.useCases.create(dto as any); }
  @Patch(':id') @ApiOkResponse({ description: 'Registro atualizado.' }) update(@Param('id') id: string, @Body() dto: UpdatePermissionsDto) { return this.useCases.update(id, dto as any); }
}
