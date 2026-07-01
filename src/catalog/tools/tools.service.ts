import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tool } from './entities/tool.entity';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolsRepository: Repository<Tool>,
  ) {}

  async create(createToolDto: CreateToolDto): Promise<Tool> {
    const exists = await this.toolsRepository.findOne({
      where: { name: createToolDto.name },
    });

    if (exists) {
      throw new ConflictException('Tool already exists');
    }

    const tool = this.toolsRepository.create(createToolDto);

    return await this.toolsRepository.save(tool);
  }

  async findAll(): Promise<Tool[]> {
    return await this.toolsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Tool> {
    const tool = await this.toolsRepository.findOne({
      where: { id },
    });

    if (!tool) {
      throw new NotFoundException('Tool not found');
    }

    return tool;
  }

  async update(id: number, updateToolDto: UpdateToolDto): Promise<Tool> {
    const tool = await this.findOne(id);

    if (updateToolDto.name && updateToolDto.name !== tool.name) {
      const exists = await this.toolsRepository.findOne({
        where: { name: updateToolDto.name },
      });

      if (exists) {
        throw new ConflictException('Tool already exists');
      }
    }

    Object.assign(tool, updateToolDto);

    return await this.toolsRepository.save(tool);
  }

  async remove(id: number): Promise<{ message: string }> {
    const tool = await this.findOne(id);

    await this.toolsRepository.remove(tool);

    return {
      message: 'Tool deleted successfully',
    };
  }
}
