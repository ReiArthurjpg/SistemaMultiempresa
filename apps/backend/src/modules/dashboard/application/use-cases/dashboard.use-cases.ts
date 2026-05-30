import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
@Injectable()
export class DashboardUseCases { constructor(private prisma: PrismaService) {} async summary(){ const [totalCompanies,totalUsers,consumed,available,latestLogs]=await Promise.all([this.prisma.company.count({where:{deletedAt:null}}),this.prisma.user.count({where:{deletedAt:null}}),this.prisma.creditTransaction.aggregate({where:{transactionType:'USE'},_sum:{amount:true}}),this.prisma.credit.aggregate({_sum:{balance:true}}),this.prisma.auditLog.findMany({take:5,orderBy:{createdAt:'desc'}})]); return { totalCompanies,totalUsers,creditsConsumed:Number(consumed._sum.amount ?? 0),creditsAvailable:Number(available._sum.balance ?? 0),latestLogs}; } }
