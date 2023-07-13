import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

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

  async createTodo(todo: Todo): Promise<Todo> {
    return await this.todosRepository.save(todo);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.todosRepository.delete(id);
    return {
      message: `Todo: ${id} deleted`
    };
  }

  async editTodo(id: number, todo: Todo): Promise<Todo> {
    const editedTodo: Todo = await this.todosRepository.findOne(id);
    if (!editedTodo) {
      throw new NotFoundException('Todo is not found');
    }
    editedTodo.description = todo.description;
    editedTodo.title = todo.title;
    await editedTodo.save();
    return editedTodo;
  }
}
