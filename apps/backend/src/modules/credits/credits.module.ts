import { Module } from '@nestjs/common';
import { CreditsUseCases } from './application/use-cases/credits.use-cases';
import { CreditsController } from './presentation/controllers/credits.controller';
@Module({ providers: [CreditsUseCases], controllers: [CreditsController] })
export class CreditsModule {}
