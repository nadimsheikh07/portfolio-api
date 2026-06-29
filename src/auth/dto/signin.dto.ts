import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    format: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user account (minimum 6 characters)',
    example: 'Secure@123',
    minLength: 6,
    format: 'password',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
