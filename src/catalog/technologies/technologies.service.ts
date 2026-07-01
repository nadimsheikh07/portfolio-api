import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologiesRepository: Repository<Technology>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto): Promise<Technology> {
    const exists = await this.technologiesRepository.findOne({
      where: { name: createTechnologyDto.name },
    });

    if (exists) {
      throw new ConflictException('Technology already exists');
    }

    const technology = this.technologiesRepository.create(createTechnologyDto);

    return await this.technologiesRepository.save(technology);
  }

  async findAll(): Promise<Technology[]> {
    return await this.technologiesRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Technology> {
    const technology = await this.technologiesRepository.findOne({
      where: { id },
    });

    if (!technology) {
      throw new NotFoundException('Technology not found');
    }

    return technology;
  }

  async update(
    id: number,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<Technology> {
    const technology = await this.findOne(id);

    if (
      updateTechnologyDto.name &&
      updateTechnologyDto.name !== technology.name
    ) {
      const exists = await this.technologiesRepository.findOne({
        where: { name: updateTechnologyDto.name },
      });

      if (exists) {
        throw new ConflictException('Technology already exists');
      }
    }

    Object.assign(technology, updateTechnologyDto);

    return await this.technologiesRepository.save(technology);
  }

  async remove(id: number): Promise<{ message: string }> {
    const technology = await this.findOne(id);

    await this.technologiesRepository.remove(technology);

    return {
      message: 'Technology deleted successfully',
    };
  }
}
