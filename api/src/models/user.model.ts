import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
export class User {
  @ApiProperty({
    readOnly: true,
  })
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'Name of the user',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'john@doe.com',
    description: 'The email of the user',
    required: true,
    uniqueItems: true,
  })
  email: string;

  @Exclude()
  @ApiProperty({
    minLength: 10,
    maxLength: 64,
    required: true,
    example: '!ryL4_duJ@ct*cU2AVuQaKZ6',
    writeOnly: true,
  })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
