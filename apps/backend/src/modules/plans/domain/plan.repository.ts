export const IPlansRepository = Symbol('IPlansRepository');
export interface IPlansRepository { list(params?: { take?: number; cursor?: string; companyId?: string }): Promise<unknown[]>; get(id: string): Promise<unknown>; create(data: Record<string, unknown>): Promise<unknown>; update(id: string, data: Record<string, unknown>): Promise<unknown>; }
