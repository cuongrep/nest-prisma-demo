import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly name: string;
}
