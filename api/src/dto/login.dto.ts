import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ required: true, example: 'john@doe.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: '!ryL4_duJ@ct*cU2AVuQaKZ6' })
  password: string;
}
