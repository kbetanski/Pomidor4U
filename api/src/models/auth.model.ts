import { User } from './user.model';
import { Token } from './token.model';
import { ApiProperty } from '@nestjs/swagger';

export class Auth extends Token {
  @ApiProperty({ type: User })
  user: User;
}
