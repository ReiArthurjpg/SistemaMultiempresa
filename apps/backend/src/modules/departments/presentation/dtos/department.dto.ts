import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateDepartmentsDto { @ApiProperty({ example: 'Nome' }) @IsString() name!: string; @ApiPropertyOptional() @IsOptional() @IsString() description?: string; }
export class UpdateDepartmentsDto { @ApiPropertyOptional() @IsOptional() @IsString() name?: string; @ApiPropertyOptional() @IsOptional() @IsString() description?: string; }
