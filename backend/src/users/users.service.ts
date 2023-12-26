import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { name, email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throw new HttpException(`Email já registrado!`, HttpStatus.CONFLICT);
    }

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('user not exist!');
    }

    return user;
  }

  async validateUserId(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
