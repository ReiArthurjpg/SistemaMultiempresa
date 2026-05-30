import { BadRequestException } from '@nestjs/common';
import { CreditsUseCases } from './credits.use-cases';
describe('CreditsUseCases', () => { it('rejects negative balance by business rule', async () => { const tx = { credit: { upsert: jest.fn().mockResolvedValue({ balance: 0 }) } }; const prisma = { $transaction: (fn: any) => fn(tx) } as any; const service = new CreditsUseCases(prisma, { emit: jest.fn() } as any); await expect(service.operate({ companyId: 'c1', amount: 1, transactionType: 'USE', description: 'test' })).rejects.toBeInstanceOf(BadRequestException); }); });
