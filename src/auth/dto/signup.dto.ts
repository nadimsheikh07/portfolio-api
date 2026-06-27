import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserType } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Mobile number of the user (10-15 digits)',
    example: '+1234567890',
    minLength: 10,
    maxLength: 15,
  })
  @IsString()
  @Length(10, 15)
  mobile?: string;

  @ApiProperty({
    description: 'Password for the user account (minimum 6 characters)',
    example: 'Secure@123',
    minLength: 6,
    format: 'password',
  })
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    description: 'Type of user account',
    enum: UserType,
    example: UserType.CUSTOMER,
    enumName: 'UserType',
  })
  @IsIn([UserType.CUSTOMER, UserType.DRIVER])
  userType?: UserType.CUSTOMER | UserType.DRIVER;

  @ApiPropertyOptional({
    description: 'Name of the cab (required for DRIVER user type)',
    example: 'Uber X',
    minLength: 1,
  })
  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  cabName?: string;

  @ApiPropertyOptional({
    description: 'Model of the cab (required for DRIVER user type)',
    example: 'Toyota Camry 2024',
    minLength: 1,
  })
  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  cabModel?: string;

  @ApiPropertyOptional({
    description:
      'License plate number of the cab (required for DRIVER user type)',
    example: 'ABC-1234',
    minLength: 1,
  })
  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  cabNumber?: string;

  @ApiPropertyOptional({
    description: 'URL or path to the cab image (optional)',
    example: 'https://example.com/images/cab-123.jpg',
    format: 'uri',
  })
  @IsOptional()
  @IsString()
  cabImage?: string;

  @ApiPropertyOptional({
    description: 'Driving license number (required for DRIVER user type)',
    example: 'DL-1234567890',
    minLength: 1,
  })
  @ValidateIf((dto: SignupDto) => dto.userType === UserType.DRIVER)
  @IsString()
  @IsNotEmpty()
  drivingLicense?: string;
}
