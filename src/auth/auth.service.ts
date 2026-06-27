import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthUser } from './types/auth-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.usersService.findByEmailOrMobile(
      dto.email,
      dto.mobile,
    );

    if (existingUser) {
      throw new ConflictException('Email or mobile already exists');
    }

    const user = await this.usersService.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    return this.authResponse(user);
  }

  async signin(dto: SigninDto) {
    const user = await this.usersService.findByEmail(dto.email, true);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    return this.authResponse(user);
  }

  async getProfile(user: AuthUser) {
    return this.usersService.findProfile(user.sub);
  }

  async updateProfile(user: AuthUser, dto: UpdateProfileDto) {
    const update = { ...dto };
    delete update.password;
    delete update.userType;
    return this.usersService.updateProfile(user.sub, update);
  }

  private authResponse(user: Awaited<ReturnType<UsersService['findProfile']>>) {
    const payload: AuthUser = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
