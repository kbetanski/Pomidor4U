import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 64)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 64)
  newPassword: string;
}
