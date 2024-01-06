import { Module } from '@nestjs/common';

import { PostsService } from 'src/posts/posts.service';
import { WebscrapingService } from './webscraping.service';

@Module({
  providers: [PostsService],
  exports: [WebscrapingService],
})
export class WebscrapingModule {}
