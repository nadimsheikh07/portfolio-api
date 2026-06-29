import { PartialType } from '@nestjs/swagger';
import { CreateUserTechnologyDto } from './create-user-technology.dto';

export class UpdateUserTechnologyDto extends PartialType(CreateUserTechnologyDto) {}
