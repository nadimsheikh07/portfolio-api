import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTechnologiesService } from './user-technologies.service';
import { CreateUserTechnologyDto } from './dto/create-user-technology.dto';
import { UpdateUserTechnologyDto } from './dto/update-user-technology.dto';

@Controller('user-technologies')
export class UserTechnologiesController {
  constructor(private readonly userTechnologiesService: UserTechnologiesService) {}

  @Post()
  create(@Body() createUserTechnologyDto: CreateUserTechnologyDto) {
    return this.userTechnologiesService.create(createUserTechnologyDto);
  }

  @Get()
  findAll() {
    return this.userTechnologiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTechnologiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTechnologyDto: UpdateUserTechnologyDto) {
    return this.userTechnologiesService.update(+id, updateUserTechnologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTechnologiesService.remove(+id);
  }
}
