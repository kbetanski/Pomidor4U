import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ type: 'string' })
  accessToken: string;

  @ApiProperty({ type: 'string' })
  refreshToken: string;
}
