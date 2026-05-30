import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { LoginDto } from '../presentation/dtos/auth.dto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  async login(dto: LoginDto, ip?: string) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email }, include: { twoFactorSecret: true, allowedIps: true, accessSchedules: true } });
    if (!user || !user.isActive || user.deletedAt) throw new UnauthorizedException('Credenciais inválidas.');
    if (user.lockedUntil && user.lockedUntil > new Date()) throw new ForbiddenException('Usuário bloqueado temporariamente.');
    await this.validateIp(user.id, ip);
    this.validateSchedule(user.accessSchedules);
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) { await this.registerFailedLogin(user.id, user.failedLoginAttempts); throw new UnauthorizedException('Credenciais inválidas.'); }
    if (user.twoFactorEnabled && user.twoFactorSecret && !speakeasy.totp.verify({ secret: user.twoFactorSecret.secret, encoding: 'base32', token: dto.twoFactorCode ?? '' })) throw new UnauthorizedException('Código 2FA inválido.');
    await this.prisma.user.update({ where: { id: user.id }, data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() } });
    await this.audit(user.id, user.companyId, 'LOGIN', 'users', user.id, ip);
    return this.issueTokens(user.id, user.email, user.role, user.companyId);
  }
  async refresh(refreshToken: string) {
    const payload = this.jwt.verify(refreshToken, { secret: this.config.get('JWT_REFRESH_SECRET') });
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.refreshToken.create({ data: { userId: payload.sub, tokenHash, expiresAt: new Date(Date.now() + 7 * 86400000) } });
    return this.issueTokens(payload.sub, payload.email, payload.role, payload.companyId);
  }
  async setup2fa(userId: string) { const secret = speakeasy.generateSecret({ name: `Nexora (${userId})` }); await this.prisma.twoFactorSecret.upsert({ where: { userId }, update: { secret: secret.base32 }, create: { userId, secret: secret.base32 } }); return { secret: secret.base32, qrCode: await QRCode.toDataURL(secret.otpauth_url ?? '') }; }
  private async issueTokens(sub: string, email: string, role: string, companyId?: string | null) { const payload = { sub, email, role, companyId }; return { accessToken: await this.jwt.signAsync(payload), refreshToken: await this.jwt.signAsync(payload, { secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') ?? '7d' }), user: payload }; }
  private async validateIp(userId: string, ip?: string) { const ips = await this.prisma.allowedIp.findMany({ where: { userId } }); if (ips.some((x) => x.restrictionType === 'RESTRICTED') && !ips.some((x) => x.ip === ip)) throw new ForbiddenException('IP não autorizado.'); }
  private validateSchedule(schedules: Array<{ allowedDays: unknown; startTime: string; endTime: string }>) { if (!schedules.length) return; const now = new Date(); const day = now.getUTCDay(); const time = now.toISOString().slice(11, 16); const allowed = schedules.some((s) => Array.isArray(s.allowedDays) && s.allowedDays.includes(day) && time >= s.startTime && time <= s.endTime); if (!allowed) throw new ForbiddenException('Horário de acesso não autorizado.'); }
  private async registerFailedLogin(id: string, attempts: number) { await this.prisma.user.update({ where: { id }, data: { failedLoginAttempts: attempts + 1, lockedUntil: attempts + 1 >= 5 ? new Date(Date.now() + 15 * 60000) : null } }); }
  private audit(userId: string, companyId: string | null, action: string, entity: string, entityId?: string, ip?: string) { return this.prisma.auditLog.create({ data: { userId, companyId, action, entity, entityId, ip } }); }
}
