import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersUseCases } from '../../application/use-cases/users.use-cases';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
@ApiTags('Users') @ApiBearerAuth() @Controller('users')
export class UsersController { constructor(private useCases: UsersUseCases) {} @Get() @ApiOkResponse() list(@Query('take') take?:string,@Query('cursor') cursor?:string){return this.useCases.list(take?Number(take):25,cursor)} @Get(':id') get(@Param('id') id:string){return this.useCases.get(id)} @Post() @ApiCreatedResponse() create(@Body() dto:CreateUserDto){return this.useCases.create(dto)} @Patch(':id') update(@Param('id') id:string,@Body() dto:UpdateUserDto){return this.useCases.update(id,dto)} }
