import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';

import { Post } from 'src/posts/posts.schema';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class WebscrapingService {
  constructor(private readonly postsService: PostsService) {}

  async scrapHackerNews() {
    try {
      const browser = await chromium.connect(
        `wss://chrome.browserless.io/playwright?token=${process.env.BROWSERLESS_API_KEY}`,
      );
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('https://thehackernews.com/');

      const posts: Post[] = [];
      const today = new Date().toISOString().split('T')[0];

      for (let i = 0; i < 3; i++) {
        await page.waitForLoadState('domcontentloaded');

        const leftBox = await page.$('#left-box');
        const postBoxes = await leftBox.$$('.home-post-box');

        for (const postBox of postBoxes) {
          const thumbnailElement = await postBox.$('img');
          await thumbnailElement?.scrollIntoViewIfNeeded();
          await page.waitForTimeout(1000);
          const thumbnail = await thumbnailElement?.getAttribute('src');

          const titleElement = await postBox.$('.home-title');
          const title = await titleElement?.innerText();

          const descriptionElement = await postBox.$('.home-desc');
          const description = await descriptionElement?.innerText();

          const dateElement = await postBox.$('.h-datetime');
          const publishedOn = (await dateElement?.innerHTML())?.split('/i>')[1];

          const tagElement = await postBox.$('.h-tags');
          const tag = await tagElement?.innerText();

          posts.push({
            title,
            description,
            thumbnail,
            tag,
            publishedOn,
            date: today,
          });
        }

        const nextPageLink = await page.$('#Blog1_blog-pager-older-link');
        await nextPageLink.click();
      }

      await browser.close();

      if (posts.length) await this.postsService.insertMultiple(posts);
    } catch (err) {
      console.log(
        `Error scraping for date ${new Date().toISOString()} : `,
        err,
      );
    }
  }
}
