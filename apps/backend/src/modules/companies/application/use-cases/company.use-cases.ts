import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ICompaniesRepository } from '../../domain/company.repository';
@Injectable()
export class CompaniesUseCases {
  constructor(@Inject(ICompaniesRepository) private readonly repo: ICompaniesRepository, private readonly events: EventEmitter2) {}
  list(query: { take?: number; cursor?: string; companyId?: string }) { return this.repo.list(query); }
  get(id: string) { return this.repo.get(id); }
  async create(data: Record<string, unknown>) { const item = await this.repo.create(data); this.events.emit('company.created', item); return item; }
  async update(id: string, data: Record<string, unknown>) { const item = await this.repo.update(id, data); this.events.emit('company.updated', item); return item; }
}
