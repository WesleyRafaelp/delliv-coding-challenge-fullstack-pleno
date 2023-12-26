import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tokenOld: string, id: number) {
    await this.validateToken(tokenOld);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 8);

    const crete = await this.prisma.tokens.create({
      data: {
        tokenInvalid: tokenOld,
        idUser: id,
        expiresAt: expirationDate,
      },
    });

    console.log(crete);

    return true;
  }

  async validateToken(token: string) {
    const tokenInvalid = await this.prisma.tokens.findFirst({
      where: { tokenInvalid: token },
    });

    if (tokenInvalid) {
      throw new NotFoundException('Token invalid!');
    }

    return true;
  }

  async removeExpiredTokens() {
    const currentDate = new Date();
    await this.prisma.tokens.deleteMany({
      where: {
        expiresAt: {
          lt: currentDate,
        },
      },
    });
  }

  findAll() {
    return this.prisma.tokens.findMany();
  }
}
