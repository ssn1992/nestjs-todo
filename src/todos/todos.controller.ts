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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('clear/all')
  @ApiOperation({ summary: 'Clear all todos', description: 'Removes all todos from the database' })
  @ApiResponse({ status: 200, description: 'All todos have been cleared successfully' })
  clear(): Promise<{ message: string }> {
    return this.todosService.clear();
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos', description: 'Retrieves a list of all todos' })
  @ApiResponse({ status: 200, description: 'Returns all todos', type: [Todo] })
  findAll(): Promise<Todo[]> {
    return this.todosService.getTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id', description: 'Retrieves a single todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the todo', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findOne(@Param('id', ParseIntPipe) id): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo', description: 'Creates a new todo item' })
  @ApiBody({ type: CreateTodoDto, description: 'The todo to create' })
  @ApiResponse({ status: 201, description: 'The todo has been successfully created', type: Todo })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  create(@Body() todo: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTodo(todo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo', description: 'Updates an existing todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo to update', type: Number })
  @ApiBody({ type: UpdateTodoDto, description: 'The updated todo data' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully updated', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async editTodo(@Body() todo: UpdateTodoDto, @Param('id') id: number): Promise<Todo> {
    return await this.todosService.editTodo(id, todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo', description: 'Removes a todo by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the todo to delete', type: Number })
  @ApiResponse({ status: 200, description: 'The todo has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  remove(@Param('id', ParseIntPipe) id): Promise<{ message: string }> {
    return this.todosService.remove(id);
  }
}
