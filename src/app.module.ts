import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.RDS_HOSTNAME || 'localhost',
      port: Number(process.env.RDS_PORT) || 3306,
      username: process.env.RDS_USERNAME || 'root',
      password: process.env.RDS_PASSWORD || 'root',
      database: process.env.RDS_DB_NAME || 'nest_todo',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}