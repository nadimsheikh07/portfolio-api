import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.toProfile(await this.usersRepository.save(user));
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => this.toProfile(user));
  }

  async findOne(id: number) {
    return this.findProfile(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.updateProfile(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);
    return { deleted: true };
  }

  findByEmail(email: string, includePassword = false) {
    return this.usersRepository.findOne({
      where: { email },
      select: includePassword ? this.selectWithPassword() : undefined,
    });
  }

  findByEmailOrMobile(email: string, mobile: string) {
    return this.usersRepository.findOne({
      where: [{ email }, { mobile }],
    });
  }

  async findProfile(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toProfile(user);
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    return this.toProfile(await this.usersRepository.save(user));
  }

  private toProfile(user: User) {
    const { password, ...profile } = user;
    return profile;
  }

  private selectWithPassword(): FindOptionsSelect<User> {
    return {
      id: true,
      name: true,
      email: true,
      mobile: true,
      password: true,
      userType: true,
      isActive: true,
      cabName: true,
      cabModel: true,
      cabNumber: true,
      cabImage: true,
      drivingLicense: true,
      createdAt: true,
      updatedAt: true,
    };
  }
}
