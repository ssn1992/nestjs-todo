import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}
  async getTodos(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    return await this.todosRepository.save(todo);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.todosRepository.delete(id);
    return {
      message: `Todo: ${id} deleted`
    };
  }

  async clear(): Promise<{ message: string }> {
    await this.todosRepository.clear();
    return {
      message: `Todos deleted`
    };
  }

  async editTodo(id: number, todo: UpdateTodoDto): Promise<Todo> {
    const editedTodo: Todo = await this.todosRepository.findOne(id);
    if (!editedTodo) {
      throw new NotFoundException('Todo is not found');
    }
    if (todo.description !== undefined) {
      editedTodo.description = todo.description;
    }
    if (todo.title !== undefined) {
      editedTodo.title = todo.title;
    }
    if (todo.isDone !== undefined) {
      editedTodo.isDone = todo.isDone;
    }
    await editedTodo.save();
    return editedTodo;
  }
}
