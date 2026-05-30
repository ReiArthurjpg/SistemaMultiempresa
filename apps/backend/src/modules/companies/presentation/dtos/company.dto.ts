import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreateCompaniesDto { @ApiProperty({ example: 'Nome' }) @IsString() name!: string; @ApiPropertyOptional() @IsOptional() @IsString() description?: string; }
export class UpdateCompaniesDto { @ApiPropertyOptional() @IsOptional() @IsString() name?: string; @ApiPropertyOptional() @IsOptional() @IsString() description?: string; }
