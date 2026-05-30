import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './application/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
@Module({ imports: [JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (c: ConfigService) => ({ secret: c.get('JWT_ACCESS_SECRET') ?? 'dev', signOptions: { expiresIn: c.get('JWT_ACCESS_EXPIRES_IN') ?? '15m' } }) })], providers: [AuthService], controllers: [AuthController], exports: [JwtModule] })
export class AuthModule {}
