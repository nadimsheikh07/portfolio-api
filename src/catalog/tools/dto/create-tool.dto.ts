import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
