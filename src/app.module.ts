import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { WebscrapingModule } from './webscraping/webscraping.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ScheduleModule.forRoot(),
    PostsModule,
    SchedulerModule,
    WebscrapingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
