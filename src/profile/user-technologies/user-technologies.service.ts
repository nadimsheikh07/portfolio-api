import { Injectable } from '@nestjs/common';
import { CreateUserTechnologyDto } from './dto/create-user-technology.dto';
import { UpdateUserTechnologyDto } from './dto/update-user-technology.dto';

@Injectable()
export class UserTechnologiesService {
  create(createUserTechnologyDto: CreateUserTechnologyDto) {
    return 'This action adds a new userTechnology';
  }

  findAll() {
    return `This action returns all userTechnologies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTechnology`;
  }

  update(id: number, updateUserTechnologyDto: UpdateUserTechnologyDto) {
    return `This action updates a #${id} userTechnology`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTechnology`;
  }
}
