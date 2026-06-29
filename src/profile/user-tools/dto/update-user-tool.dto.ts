import { PartialType } from '@nestjs/swagger';
import { CreateUserToolDto } from './create-user-tool.dto';

export class UpdateUserToolDto extends PartialType(CreateUserToolDto) {}
