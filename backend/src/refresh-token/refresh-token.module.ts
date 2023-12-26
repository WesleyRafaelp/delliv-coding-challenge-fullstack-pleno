import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { TokenCleanupService } from './token-cleanup.service';
import { RefreshTokenController } from './refresh-token.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService, TokenCleanupService, PrismaService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
