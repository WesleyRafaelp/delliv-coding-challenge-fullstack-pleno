import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const { client, deliveryAddress } = data;

    return await this.prisma.order.create({
      data: {
        client,
        deliveryAddress,
        status: 'PENDENTE',
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: { status: updateOrderDto.status },
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
