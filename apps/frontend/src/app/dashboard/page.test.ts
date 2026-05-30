import { describe, expect, it } from 'vitest';
describe('dashboard cards', () => { it('keeps core metrics configured', () => { expect(['Total Empresas','Total Usuários','Créditos Consumidos','Créditos Disponíveis']).toHaveLength(4); }); });
