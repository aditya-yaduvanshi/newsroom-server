import { Module } from '@nestjs/common';

import { WebscrapingService } from 'src/webscraping/webscraping.service'; 

import { SchedulerService } from './scheduler.service';

@Module({
  providers: [SchedulerService, WebscrapingService],
})
export class SchedulerModule {}
