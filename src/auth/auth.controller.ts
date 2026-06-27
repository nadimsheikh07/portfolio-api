import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { AuthUser } from './types/auth-user.type';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user account with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      example: {
        statusCode: 201,
        message: 'User registered successfully',
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          mobile: '+1234567890',
          userType: 'CUSTOMER',
          createdAt: '2026-06-25T10:30:00.000Z',
          updatedAt: '2026-06-25T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'name must be a string',
          'email must be an email',
          'mobile must be between 10 and 15 characters',
          'password must be at least 6 characters',
          'userType must be one of the following values: CUSTOMER, DRIVER',
          'cabName should not be empty',
          'cabModel should not be empty',
          'cabNumber should not be empty',
          'drivingLicense should not be empty',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email or mobile already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already registered',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiOperation({
    summary: 'User Login',
    description:
      'Authenticate user with email and password to receive JWT access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    type: 'SigninResponseDto',
    schema: {
      example: {
        statusCode: 200,
        message: 'Login successful',
        data: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          user: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'John Doe',
            email: 'john.doe@example.com',
            userType: 'CUSTOMER',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid email or password',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be at least 6 characters',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User does not exist',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiBody({
    type: SigninDto,
    description: 'User login credentials',
    examples: {
      'valid-login': {
        summary: 'Valid Login Credentials',
        value: {
          email: 'john.doe@example.com',
          password: 'Secure@123',
        },
      },
      'invalid-email': {
        summary: 'Invalid Email Format',
        value: {
          email: 'invalid-email',
          password: 'Secure@123',
        },
      },
      'short-password': {
        summary: 'Password Too Short',
        value: {
          email: 'john.doe@example.com',
          password: '123',
        },
      },
    },
  })
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get User Profile',
    description:
      'Retrieve the complete profile information of the currently authenticated user. Requires a valid JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Profile retrieved successfully',
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          mobile: '+1234567890',
          userType: 'DRIVER',
          cabName: 'Uber X',
          cabModel: 'Toyota Camry 2024',
          cabNumber: 'ABC-1234',
          cabImage: 'https://example.com/images/cab-123.jpg',
          drivingLicense: 'DL-1234567890',
          avatar: 'https://example.com/images/avatar.jpg',
          isActive: true,
          isVerified: true,
          createdAt: '2026-06-25T10:30:00.000Z',
          updatedAt: '2026-06-25T14:20:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid JWT token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Token expired or invalid',
    schema: {
      example: {
        statusCode: 403,
        message: 'Token expired',
        error: 'Forbidden',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
  getProfile(@CurrentUser() user: AuthUser) {
    return this.authService.getProfile(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update User Profile',
    description:
      'Update the profile information of the currently authenticated user. All fields are optional and will only update the fields provided.',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Profile updated successfully',
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          mobile: '+9876543210',
          userType: 'DRIVER',
          cabName: 'Uber XL',
          cabModel: 'Toyota Camry 2025',
          cabNumber: 'XYZ-5678',
          cabImage: 'https://example.com/images/new-cab.jpg',
          drivingLicense: 'DL-9876543210',
          avatar: 'https://example.com/images/new-avatar.jpg',
          isActive: true,
          isVerified: true,
          updatedAt: '2026-06-25T15:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'mobile must be between 10 and 15 characters',
          'name must be a string',
          'cabName should not be empty',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid JWT token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Token expired or invalid',
    schema: {
      example: {
        statusCode: 403,
        message: 'Token expired',
        error: 'Forbidden',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email or mobile already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already in use by another account',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal Server Error',
      },
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
  @ApiBody({
    type: UpdateProfileDto,
    description: 'Profile fields to update (all fields are optional)',
    examples: {
      'update-name-email': {
        summary: 'Update Name and Email',
        description: 'Update only the name and email fields',
        value: {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
        },
      },
      'update-all-fields': {
        summary: 'Update All Fields',
        description: 'Update all profile fields',
        value: {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          mobile: '+9876543210',
          cabName: 'Uber XL',
          cabModel: 'Toyota Camry 2025',
          cabNumber: 'XYZ-5678',
          cabImage: 'https://example.com/images/new-cab.jpg',
          drivingLicense: 'DL-9876543210',
          avatar: 'https://example.com/images/new-avatar.jpg',
        },
      },
      'update-driver-fields': {
        summary: 'Update Driver Specific Fields',
        description: 'Update only driver-related fields',
        value: {
          cabName: 'Uber XL',
          cabModel: 'Toyota Camry 2025',
          cabNumber: 'XYZ-5678',
          drivingLicense: 'DL-9876543210',
        },
      },
      'update-single-field': {
        summary: 'Update Single Field',
        description: 'Update only one field',
        value: {
          avatar: 'https://example.com/images/new-avatar.jpg',
        },
      },
    },
  })
  updateProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(user, dto);
  }
}
