import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDepartmentsRepository } from '../../domain/department.repository';
@Injectable()
export class DepartmentsUseCases {
  constructor(@Inject(IDepartmentsRepository) private readonly repo: IDepartmentsRepository, private readonly events: EventEmitter2) {}
  list(query: { take?: number; cursor?: string; companyId?: string }) { return this.repo.list(query); }
  get(id: string) { return this.repo.get(id); }
  async create(data: Record<string, unknown>) { const item = await this.repo.create(data); this.events.emit('department.created', item); return item; }
  async update(id: string, data: Record<string, unknown>) { const item = await this.repo.update(id, data); this.events.emit('department.updated', item); return item; }
}
