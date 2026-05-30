import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class LoginDto { @ApiProperty({ example: 'master@nexora.local' }) @IsEmail() email!: string; @ApiProperty({ example: 'Admin@123' }) @IsString() @MinLength(8) password!: string; @ApiProperty({ required: false, example: '123456' }) @IsOptional() @IsString() twoFactorCode?: string; }
export class RefreshTokenDto { @ApiProperty() @IsString() refreshToken!: string; }
