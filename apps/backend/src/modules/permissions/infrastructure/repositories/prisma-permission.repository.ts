import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { IPermissionsRepository } from '../../domain/permission.repository';
@Injectable()
export class PrismaPermissionsRepository implements IPermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}
  list(params: { take?: number; cursor?: string; companyId?: string } = {}) { return (this.prisma as any).permission.findMany({ take: params.take ?? 25, ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}), where: { deletedAt: null, ...(params.companyId ? { companyId: params.companyId } : {}) }, orderBy: { createdAt: 'desc' } }); }
  get(id: string) { return (this.prisma as any).permission.findUnique({ where: { id } }); }
  create(data: Record<string, unknown>) { return (this.prisma as any).permission.create({ data }); }
  update(id: string, data: Record<string, unknown>) { return (this.prisma as any).permission.update({ where: { id }, data }); }
}
