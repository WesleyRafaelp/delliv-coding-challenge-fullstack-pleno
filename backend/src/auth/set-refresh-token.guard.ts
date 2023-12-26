import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

@Injectable()
export class SetRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  constructor(
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    context.switchToHttp().getRequest();
    context.switchToHttp().getResponse();

    await super.canActivate(context);
    return true;
  }
}
