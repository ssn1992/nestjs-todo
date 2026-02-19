import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
    minLength: 1,
    maxLength: 150,
    required: false,
  })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The detailed description of the todo',
    example: 'Need to buy milk, eggs, and bread from the store',
    minLength: 1,
    required: false,
  })
  @MinLength(1)
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Indicates whether the todo is completed',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
}
