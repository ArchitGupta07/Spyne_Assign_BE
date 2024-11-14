import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email of the User' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password Provided by the user' })
  password: string;
}
