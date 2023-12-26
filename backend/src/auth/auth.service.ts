import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginDto } from 'src/users/dto/login.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user && compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.email, login.password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(user: User) {
    const accessToken = this.generateAccessToken(user);

    return { accessToken };
  }

  generateAccessToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION_AT,
      secret: process.env.JWT_SECRET,
    });

    return accessToken;
  }

  async generateRefreshToken(id: number) {
    const payload = {
      sub: id,
    };
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION_RT,
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return refreshToken;
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (decoded) {
        return true && decoded;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
