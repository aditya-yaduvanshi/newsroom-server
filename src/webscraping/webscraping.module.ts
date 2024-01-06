import { Module } from '@nestjs/common';

import { PostsModule } from 'src/posts/posts.module';

import { WebscrapingService } from './webscraping.service';

@Module({
  imports: [PostsModule],
  providers: [WebscrapingService],
  exports: [WebscrapingService],
})
export class WebscrapingModule {}
