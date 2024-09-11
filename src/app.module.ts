import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskController } from './task/task.controller';
@Module({
  imports:  [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,        
      username: 'root',  
      password: '12345', 
      database: 'cqrs_db', 
      entities: [Task], 
      synchronize: false, 
    }),CqrsModule,TasksModule],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
