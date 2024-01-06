import { Controller, Get } from '@nestjs/common';

import { PostsService } from './posts.service';

@Controller('/api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/recent')
  async listRecentPosts() {
    const posts = await this.postsService.listRecent();
    return posts;
  }
}
