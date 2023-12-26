import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Status, UpdateOrderDto } from './dto/update-order.dto';
import { NotFoundException } from '@nestjs/common';

const fakeOrders = [
  {
    id: 1,
    client: 'John Doe',
    deliveryAddress: '123 Main Street',
    status: 'PENDENTE',
  },
  {
    id: 2,
    client: 'Jane Doe',
    deliveryAddress: '456 Oak Avenue',
    status: 'ENTREGUE',
  },
];

const prismaMock = {
  order: {
    create: jest.fn().mockReturnValue(fakeOrders[0]),
    findMany: jest.fn().mockResolvedValue(fakeOrders),
    update: jest.fn().mockResolvedValue(fakeOrders[0]),
    delete: jest.fn(),
  },
};

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        client: 'John Doe',
        deliveryAddress: '123 Main Street',
      };

      const response = await service.create(createOrderDto);

      expect(response).toEqual(fakeOrders[0]);
      expect(prisma.order.create).toHaveBeenCalledTimes(1);
      expect(prisma.order.create).toHaveBeenCalledWith({
        data: { ...createOrderDto, status: 'PENDENTE' },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeOrders);
      expect(prisma.order.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.order.findMany).toHaveBeenCalledWith();
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const updateOrderDto: UpdateOrderDto = { status: Status.ENVIADO };

      const response = await service.update(1, updateOrderDto);

      expect(response).toEqual(fakeOrders[0]);
      expect(prisma.order.update).toHaveBeenCalledTimes(1);
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 'ENVIADO' },
      });
    });

    it('should throw NotFoundException when no order is found', async () => {
      jest
        .spyOn(prisma.order, 'update')
        .mockRejectedValue(new NotFoundException());

      await expect(
        service.update(42, { status: Status.ENVIADO }),
      ).rejects.toThrowError(NotFoundException);
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 42 },
        data: { status: 'ENVIADO' },
      });
    });
  });

  describe('remove', () => {
    it('should delete order and return undefined', async () => {
      expect(await service.remove(1)).toBeUndefined();
      expect(prisma.order.delete).toHaveBeenCalledTimes(1);
      expect(prisma.order.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if order does not exist', async () => {
      jest
        .spyOn(prisma.order, 'delete')
        .mockRejectedValue(new NotFoundException());

      await expect(service.remove(99)).rejects.toThrowError(NotFoundException);
      expect(prisma.order.delete).toHaveBeenCalledWith({ where: { id: 99 } });
    });
  });
});
