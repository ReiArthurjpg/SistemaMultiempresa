import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IMenusRepository } from '../../domain/menu.repository';
@Injectable()
export class MenusUseCases {
  constructor(@Inject(IMenusRepository) private readonly repo: IMenusRepository, private readonly events: EventEmitter2) {}
  list(query: { take?: number; cursor?: string; companyId?: string }) { return this.repo.list(query); }
  get(id: string) { return this.repo.get(id); }
  async create(data: Record<string, unknown>) { const item = await this.repo.create(data); this.events.emit('menu.created', item); return item; }
  async update(id: string, data: Record<string, unknown>) { const item = await this.repo.update(id, data); this.events.emit('menu.updated', item); return item; }
}
