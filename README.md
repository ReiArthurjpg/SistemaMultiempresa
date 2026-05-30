# Nexora SaaS Multiempresa

Base enterprise white label para operação multiempresa com autenticação JWT/Refresh Token, 2FA, RBAC + ABAC, ledger de créditos, auditoria, planos, menus dinâmicos e frontend operacional.

## Stack

- **Frontend:** Next.js 15, React 19, TypeScript, TailwindCSS, ShadCN-ready components, TanStack Query, Zustand, Axios, React Hook Form e Zod.
- **Backend:** NestJS, TypeScript, Prisma ORM, JWT, Refresh Token rotativo, Swagger/OpenAPI, Bcrypt, Speakeasy/QRCode, Passport-ready.
- **Banco:** MySQL 8.
- **Admin DB:** phpMyAdmin.
- **Infra:** Docker Compose com Redis preparado para cache, rate limit e session store.

## Subindo com Docker

```bash
docker compose up -d
```

Serviços:

| Serviço | URL/Porta |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8007 |
| Swagger | http://localhost:8007/api |
| phpMyAdmin | http://localhost:8080 |
| MySQL | localhost:3306 |
| Redis | localhost:6379 |

## Credenciais seed

- Master: `master@nexora.local` / `Admin@123`
- Admin Demo: `admin@nexora.local` / `Admin@123`
- Empresa Demo: `Nexora Demo` (`demo.localhost`)
- Plano inicial da empresa demo: `Ouro`

## Arquitetura

O backend segue DDD + Clean Architecture em `apps/backend/src/modules`:

```text
module/
  domain/              # contratos e regras do domínio
  application/         # commands, queries e use cases
  infrastructure/      # repositórios Prisma e integrações
  presentation/        # controllers e DTOs
```

Controllers delegam para use cases. Acesso a dados fica encapsulado por repositórios ou serviços de aplicação. Eventos internos usam `EventEmitter2` e a estrutura está preparada para substituir handlers por RabbitMQ, Kafka ou SQS.

## Multi-tenant e White Label

O middleware de tenant resolve a empresa por:

- subdomínio: `empresa1.localhost`
- domínio próprio: `empresa.com.br`
- header auxiliar para desenvolvimento: `x-tenant-host`

O contexto carrega `companyId`, slug, domínio, plano, logo e configurações para uso por guards e use cases.

## Fluxo de autenticação

1. `POST /auth/login` valida email/senha com bcrypt.
2. Valida IP permitido e janela de horário quando configurados.
3. Valida 2FA quando habilitado.
4. Emite access token e refresh token.
5. Registra auditoria de login.
6. `POST /auth/refresh` gera novo par de tokens e armazena hash para rotação.

## Fluxo de créditos

- Todas as movimentações passam por `POST /credits/operations`.
- O saldo é atualizado em transação junto com `credit_transactions`.
- Tipos positivos: `ADD`, `REFUND`.
- Tipos negativos: `USE`, `TRANSFER`.
- Saldo negativo é bloqueado por regra de negócio.
- Histórico é imutável e auditado.

## Fluxo de permissões

- Planos liberam menus e ações globais.
- Departamentos recebem permissões próprias.
- Usuários herdam contexto de empresa, papel, departamento, IP e horário.
- Ações suportadas: `VIEW`, `CREATE`, `UPDATE`, `DELETE`, `EXPORT`, `IMPORT`, `APPROVE`, `CANCEL`, `RELEASE_CREDIT`, `CONSULT`, `GENERATE_MAILING`, `SEND_WHATSAPP`, `BUY_CREDITS`, `DISTRIBUTE_CREDITS`, `ACCESS_SETTINGS`.

## Comandos úteis

```bash
npm install
npm run build --workspace @nexora/backend
npm run test --workspace @nexora/backend
npm run build --workspace @nexora/frontend
npm run test --workspace @nexora/frontend
```

## Documentação da API

Swagger automático disponível em:

```text
http://localhost:8007/api
```

Os DTOs usam decorators `@ApiProperty`, os controllers possuem tags e respostas documentadas, e a autenticação Bearer está configurada no OpenAPI.
