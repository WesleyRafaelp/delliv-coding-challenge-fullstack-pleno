import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [UsersModule, OrdersModule, AuthModule, RefreshTokenModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
