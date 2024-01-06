import { Module } from '@nestjs/common';

import { WebscrapingModule } from 'src/webscraping/webscraping.module';

import { SchedulerService } from './scheduler.service';

@Module({
  imports: [WebscrapingModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
