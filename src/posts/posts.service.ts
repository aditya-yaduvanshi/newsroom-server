import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PostDocument } from './posts.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts') private readonly postModel: Model<PostDocument>,
  ) {}
  async listRecent() {
    const posts = await this.postModel
      .find({
        date: new Date().toISOString().split('T')[0],
      })
      .limit(30);

    return posts.map((post) => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      thumbnail: post.thumbnail,
      publishedOn: post.publishedOn,
      date: post.date,
    }));
  }
}
