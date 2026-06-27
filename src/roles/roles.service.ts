// roles/roles.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { permissionIds, ...data } = createRoleDto;

    const exists = await this.roleRepository.findOne({
      where: { name: data.name },
    });

    if (exists) {
      throw new ConflictException('Role already exists');
    }

    const permissions = permissionIds?.length
      ? await this.permissionRepository.find({
          where: {
            id: In(permissionIds),
          },
        })
      : [];

    const role = this.roleRepository.create({
      ...data,
      permissions,
    });

    return this.roleRepository.save(role);
  }

  async findAll() {
    return this.roleRepository.find({
      relations: { permissions: true },
    });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { permissions: true },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);

    const { permissionIds, ...data } = updateRoleDto;

    Object.assign(role, data);

    if (permissionIds) {
      role.permissions = await this.permissionRepository.find({
        where: {
          id: In(permissionIds),
        },
      });
    }

    return this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);

    await this.roleRepository.remove(role);

    return {
      message: 'Role deleted successfully',
    };
  }
}
