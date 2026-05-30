import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import bcrypt from 'bcrypt';
import { PrismaService } from '../../../../common/prisma/prisma.service';
@Injectable()
export class UsersUseCases { constructor(private prisma: PrismaService, private events: EventEmitter2) {} list(take=25,cursor?:string){ return this.prisma.user.findMany({ take, ...(cursor?{cursor:{id:cursor},skip:1}:{}), where:{deletedAt:null}, orderBy:{createdAt:'desc'}, select:{id:true,name:true,email:true,role:true,companyId:true,isActive:true,createdAt:true} }); } get(id:string){ return this.prisma.user.findUnique({ where:{id}, select:{id:true,name:true,email:true,role:true,companyId:true,isActive:true,createdAt:true} }); } async create(data:any){ const user=await this.prisma.user.create({data:{name:data.name,email:data.email,role:data.role,companyId:data.companyId,passwordHash:await bcrypt.hash(data.password,12)}}); this.events.emit('user.created', user); return { ...user, passwordHash: undefined }; } update(id:string,data:any){ return this.prisma.user.update({where:{id},data, select:{id:true,name:true,email:true,role:true,companyId:true,isActive:true}}); } }
