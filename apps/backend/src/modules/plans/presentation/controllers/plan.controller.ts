import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlansUseCases } from '../../application/use-cases/plan.use-cases';
import { CreatePlansDto, UpdatePlansDto } from '../dtos/plan.dto';
@ApiTags('Plans')
@ApiBearerAuth()
@Controller('plans')
export class PlansController {
  constructor(private readonly useCases: PlansUseCases) {}
  @Get() @ApiOkResponse({ description: 'Lista paginada cursor-based.' }) list(@Query('take') take?: string, @Query('cursor') cursor?: string) { return this.useCases.list({ take: take ? Number(take) : 25, cursor }); }
  @Get(':id') @ApiOkResponse({ description: 'Registro encontrado.' }) get(@Param('id') id: string) { return this.useCases.get(id); }
  @Post() @ApiCreatedResponse({ description: 'Registro criado.' }) create(@Body() dto: CreatePlansDto) { return this.useCases.create(dto as any); }
  @Patch(':id') @ApiOkResponse({ description: 'Registro atualizado.' }) update(@Param('id') id: string, @Body() dto: UpdatePlansDto) { return this.useCases.update(id, dto as any); }
}
