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
      type: 'better-sqlite3',
      database: process.env.DB_PATH || 'todo.db',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: false,
      // Anti-locking configuration for AWS
      prepareDatabase: (db: any) => {
        // WAL mode allows concurrent reads and prevents locks
        db.pragma('journal_mode = WAL');
        // Wait up to 5 seconds if database is busy
        db.pragma('busy_timeout = 5000');
        // NORMAL is faster and safer for WAL mode
        db.pragma('synchronous = NORMAL');
      },
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}