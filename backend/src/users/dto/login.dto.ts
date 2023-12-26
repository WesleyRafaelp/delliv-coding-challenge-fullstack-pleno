import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Length(3, 30)
  email: string;

  @ApiProperty()
  @IsString()
  //@Length(8, 30)
  password: string;
}
