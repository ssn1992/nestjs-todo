import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: process.env.DB_PATH || '/tmp/todo.db',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoSave: true,
      logging: false,
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}