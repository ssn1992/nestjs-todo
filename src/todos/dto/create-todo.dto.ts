import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
    minLength: 1,
    maxLength: 150,
  })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The detailed description of the todo',
    example: 'Need to buy milk, eggs, and bread from the store',
    minLength: 1,
  })
  @MinLength(1)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates whether the todo is completed',
    example: false,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}
