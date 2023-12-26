import { Controller, Get } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Get()
  findAll() {
    return this.refreshTokenService.findAll();
  }
}
