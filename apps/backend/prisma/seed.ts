import { PrismaClient, PermissionAction } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const menus = ['Dashboard','Operações','Consultas Corban','Extrato Bancário','Ofertas de Crédito','Mailing','Digitação de Contratos','Campanhas','Agenda','NexaBot','Hot Phone','Análise de Crédito','Integrações','Relatórios','Configurações','Créditos','Cadastros'];
const departments = ['Administrador Master','Administrador Empresa','Comercial','Operacional','Call Center','Crédito','Financeiro','TI'];
const slugify = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
async function main() {
  const [bronze, prata, ouro] = await Promise.all(['Bronze','Prata','Ouro'].map((name) => prisma.plan.upsert({ where: { name }, update: {}, create: { name, description: `Plano ${name}`, limits: { users: name === 'Ouro' ? 1000 : name === 'Prata' ? 250 : 50 } } })));
  const company = await prisma.company.upsert({ where: { slug: 'nexora-demo' }, update: {}, create: { name: 'Nexora Demo', slug: 'nexora-demo', domain: 'demo.localhost', planId: ouro.id, logoUrl: '/logo.svg', settings: { whiteLabel: true } } });
  await prisma.credit.upsert({ where: { companyId: company.id }, update: { balance: 1000 }, create: { companyId: company.id, balance: 1000 } });
  for (const name of departments) await prisma.department.upsert({ where: { companyId_name: { companyId: company.id, name } }, update: {}, create: { companyId: company.id, name } });
  for (const action of Object.values(PermissionAction)) {
    const existing = await prisma.permission.findFirst({ where: { companyId: null, action, name: action } });
    if (!existing) await prisma.permission.create({ data: { name: action, action } });
  }
  let order = 0;
  for (const name of menus) {
    const slug = slugify(name);
    let menu = await prisma.menu.findFirst({ where: { companyId: null, slug } });
    menu ??= await prisma.menu.create({ data: { name, slug, path: `/${slug}`, sortOrder: order++ } });
    for (const plan of [bronze, prata, ouro]) await prisma.planPermission.upsert({ where: { planId_menuId_action: { planId: plan.id, menuId: menu.id, action: 'VIEW' } }, update: {}, create: { planId: plan.id, menuId: menu.id, action: 'VIEW' } });
  }
  const hash = await bcrypt.hash('Admin@123', 12);
  await prisma.user.upsert({ where: { email: 'master@nexora.local' }, update: {}, create: { name: 'Master Nexora', email: 'master@nexora.local', passwordHash: hash, role: 'MASTER', twoFactorEnabled: false } });
  await prisma.user.upsert({ where: { email: 'admin@nexora.local' }, update: {}, create: { name: 'Admin Demo', email: 'admin@nexora.local', passwordHash: hash, role: 'ADMIN', companyId: company.id, twoFactorEnabled: false } });
  await prisma.auditLog.create({ data: { companyId: company.id, action: 'SEED', entity: 'system', metadata: { message: 'Seed inicial Nexora criado.' } } });
}
main().finally(async () => prisma.$disconnect());
