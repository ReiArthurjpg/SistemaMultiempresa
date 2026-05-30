import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreditsUseCases } from '../../application/use-cases/credits.use-cases';
import { CreditOperationDto } from '../dtos/credit.dto';
@ApiTags('Credits') @ApiBearerAuth() @Controller('credits')
export class CreditsController { constructor(private credits: CreditsUseCases) {} @Get(':companyId/balance') @ApiOkResponse({ example: { balance: 1000 } }) balance(@Param('companyId') companyId:string){return this.credits.balance(companyId)} @Get(':companyId/ledger') ledger(@Param('companyId') companyId:string,@Query('take') take?:string,@Query('cursor') cursor?:string){return this.credits.ledger(companyId,take?Number(take):50,cursor)} @Post('operations') operate(@Body() dto: CreditOperationDto){return this.credits.operate(dto)} }
