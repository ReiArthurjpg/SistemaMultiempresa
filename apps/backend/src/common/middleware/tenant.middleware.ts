import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: Request & { tenant?: unknown }, _res: Response, next: NextFunction) {
    const host = (req.headers['x-tenant-host'] ?? req.headers.host ?? '').toString().split(':')[0];
    const subdomain = host.endsWith('.localhost') ? host.replace('.localhost', '') : undefined;
    const company = await this.prisma.company.findFirst({ where: { OR: [{ slug: subdomain }, { domain: host }] }, include: { plan: true } }).catch(() => null);
    req.tenant = company ? { companyId: company.id, slug: company.slug, domain: company.domain, plan: company.plan?.name, logoUrl: company.logoUrl, settings: company.settings } : undefined;
    next();
  }
}
