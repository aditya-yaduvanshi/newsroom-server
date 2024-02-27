import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';

import { WebscrapingService } from 'src/webscraping/webscraping.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly webscrapingService: WebscrapingService) {}

  // Disable for now as it is taking a lot of credits
  // @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async scrapDailyNewsPosts() {
    await this.webscrapingService.scrapHackerNews();
  }
}
