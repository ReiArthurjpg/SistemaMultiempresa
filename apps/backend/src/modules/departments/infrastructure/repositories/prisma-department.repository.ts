import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { IDepartmentsRepository } from '../../domain/department.repository';
@Injectable()
export class PrismaDepartmentsRepository implements IDepartmentsRepository {
  constructor(private readonly prisma: PrismaService) {}
  list(params: { take?: number; cursor?: string; companyId?: string } = {}) { return (this.prisma as any).department.findMany({ take: params.take ?? 25, ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}), where: { deletedAt: null, ...(params.companyId ? { companyId: params.companyId } : {}) }, orderBy: { createdAt: 'desc' } }); }
  get(id: string) { return (this.prisma as any).department.findUnique({ where: { id } }); }
  create(data: Record<string, unknown>) { return (this.prisma as any).department.create({ data }); }
  update(id: string, data: Record<string, unknown>) { return (this.prisma as any).department.update({ where: { id }, data }); }
}
