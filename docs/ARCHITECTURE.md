# Arquitetura Nexora

## Princípios

- Clean Architecture: domínio e aplicação independentes de HTTP e ORM.
- DDD por módulos de negócio: auth, users, companies, plans, menus, permissions, departments, credits, audit e dashboard.
- CQRS inicial: comandos e consultas possuem pastas próprias por módulo.
- Repository Pattern: contratos em `domain/` e implementações Prisma em `infrastructure/`.
- Event Driven: eventos internos com EventEmitter2 (`user.created`, `credits.add`, etc.).

## Escalabilidade

O schema Prisma inclui índices para `companyId`, `userId`, `createdAt`, `email` e `role`. Listagens aceitam cursor para paginação e as entidades principais possuem `deletedAt` para soft delete. Redis está no Compose para cache, rate limit e session store.

## Observabilidade

Endpoints:

- `/health`
- `/health/database`
- `/health/redis`
- `/metrics`

A estrutura está pronta para OpenTelemetry e exportação Prometheus.
