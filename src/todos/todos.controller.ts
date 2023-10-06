import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('clear/all')
  clear(): Promise<{ message: string }> {
    return this.todosService.clear();
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.getTodos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post() create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.createTodo(todo);
  }

  @Patch(':id')
  async editTodo(@Body() todo: Todo, @Param('id') id: number): Promise<Todo> {
    return await this.todosService.editTodo(id, todo);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id): Promise<{ message: string }> {
    return this.todosService.remove(id);
  }
}
