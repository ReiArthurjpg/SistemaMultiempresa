import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantMiddleware } from './tenant.middleware';
@Module({ providers: [TenantMiddleware] })
export class TenantMiddlewareModule implements NestModule { configure(consumer: MiddlewareConsumer) { consumer.apply(TenantMiddleware).forRoutes('*'); } }
