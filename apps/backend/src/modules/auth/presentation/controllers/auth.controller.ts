import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/decorators/public.decorator';
import { AuthService } from '../../application/auth.service';
import { LoginDto, RefreshTokenDto } from '../dtos/auth.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Public() @Post('login') @ApiOkResponse({ example: { accessToken: 'jwt', refreshToken: 'jwt', user: { email: 'master@nexora.local', role: 'MASTER' } } }) login(@Body() dto: LoginDto, @Req() req: any) { return this.auth.login(dto, req.ip); }
  @Public() @Post('refresh') refresh(@Body() dto: RefreshTokenDto) { return this.auth.refresh(dto.refreshToken); }
  @ApiBearerAuth() @Get('2fa/setup') setup(@Req() req: any) { return this.auth.setup2fa(req.user.sub); }
}
