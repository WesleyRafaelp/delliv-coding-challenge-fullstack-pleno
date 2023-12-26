import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  PENDENTE = 'PENDENTE',
  EM_PROCESSAMENTO = 'EM_PROCESSAMENTO',
  ENVIADO = 'ENVIADO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ required: false })
  client?: string;

  @ApiProperty({ required: false })
  deliveryAddress?: string;

  @ApiProperty({ enum: Status, required: false })
  status?: Status;
}
