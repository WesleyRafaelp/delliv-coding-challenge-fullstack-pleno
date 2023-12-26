import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { IsPassword } from 'src/common/validators/decorators/password';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 30)
  @IsPassword()
  password: string;
}
