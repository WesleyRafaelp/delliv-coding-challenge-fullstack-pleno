import { Injectable } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TokenCleanupService {
  constructor(private refreshTokenService: RefreshTokenService) {}

  @Cron('0 00 00 * * 1-7') // Executa a cada meia-noite
  async cleanupExpiredTokens() {
    await this.refreshTokenService.removeExpiredTokens();
    
  }
}
