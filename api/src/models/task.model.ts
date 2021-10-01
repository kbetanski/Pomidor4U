import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({
    readOnly: true,
    uniqueItems: true,
  })
  id: number;

  @ApiProperty({
    example: 'Create project',
    description: 'Title of the task',
    required: true,
  })
  title: string;

  @ApiProperty({
    example: 'Using nest.js framework and mysql',
    description: 'Description of the task',
    required: false,
  })
  content: string;

  @ApiProperty({ default: false, type: Boolean })
  finished: boolean;

  @ApiProperty({ readOnly: true })
  userId: number;
}
