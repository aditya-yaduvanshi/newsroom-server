import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: number;

  @Prop()
  thumbnail: string;

  // published date of the post article
  @Prop()
  publishedOn: Date;

  // date for which this post belongs to
  @Prop()
  date: string;
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);
