import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CreatePlansDto { @ApiProperty({ example: 'Nome' }) @IsString() name!: string; @ApiPropertyOptional() @IsOptional() @IsString() description?: string; }
export class UpdatePlansDto { @ApiPropertyOptional() @IsOptional() @IsString() name?: string; @ApiPropertyOptional() @IsOptional() @IsString() description?: string; }
