import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenCookie } from './decorators/get-refresh-token.decorator';
import { SetRefreshTokenGuard } from './set-refresh-token.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthToken } from './decorators/get-token.decorator';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @Post('login')
  async login(
    @Body() login: LoginDto,
    @Res({ passthrough: true }) res: Response,
    // @RefreshTokenCookie() refresh,
    // @Req() req: Request,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(login);

    res.cookie('REFRESH_TOKEN', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    });
    return { access_token: accessToken };
  }

  @Post('refresh-token')
  @UseGuards(SetRefreshTokenGuard)
  async refreshAccessToken(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @RefreshTokenCookie() refresh,
  ) {
    const user = req.user;
    const refreshTokenOld = req.body.refresh_token;
    const validate = await this.refreshTokenService.validateToken(
      refreshTokenOld || refresh.REFRESH_TOKEN,
    );
    if (validate !== true) {
      throw new HttpException(`Token invalid!`, HttpStatus.UNAUTHORIZED);
    }

    const savedToken = await this.refreshTokenService.create(
      refreshTokenOld || refresh.REFRESH_TOKEN,
      user.id,
    );
    if (savedToken !== true) {
      throw new HttpException(`Token invalid!`, HttpStatus.BAD_REQUEST);
    }
    const refreshToken = await this.authService.generateRefreshToken(user.id);
    const { accessToken } = await this.authService.refreshAccessToken(user);
    res.cookie('REFRESH_TOKEN', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    });
    res.cookie('ACCESS_TOKEN', accessToken, {
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  @Get('session')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@AuthToken() token: string): Promise<any> {
    if (!token) throw new UnauthorizedException('Invalid token');
    const isValid = await this.authService.verifyToken(token);

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      message: 'Token is valid',
      data: isValid,
    };
  }

  @Post('logout')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('REFRESH_TOKEN', null, { maxAge: -1 });
    return { message: 'Logged out successfully' };
  }
}
