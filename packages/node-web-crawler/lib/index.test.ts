import test from 'ava';
import crawl from '.';

test('it can crawl multi pages', async t => {
  interface HackerNewsPage {
    title: string;
  }

  const pages: HackerNewsPage[] = await crawl({
    target: {
      url: 'https://news.ycombinator.com',
      iterator: {
        selector: 'span[class="age"] > a',
        convert: (x: string) => `https://news.ycombinator.com/${x}`,
      },
    },
    fetch: (data: any, index: number, url: string) => {
      return {
        title: '[class="title"] > a',
      };
    },
  });

  t.is(pages.length, 30);
  t.true(pages[0].title !== '');
});

test('it can crawl multi pages (waitable)', async t => {
  interface HackerNewsPage {
    title: string;
  }

  const pages: HackerNewsPage[] = await crawl({
    target: {
      url: 'https://news.ycombinator.com',
      iterator: {
        selector: 'span[class="age"] > a',
        convert: (x: string) => `https://news.ycombinator.com/${x}`,
      },
    },
    waitFor: 1 * 1000,
    fetch: (data: any, index: number, url: string) => ({
      title: '[class="title"] > a',
    }),
  });

  t.is(pages.length, 30);
  t.true(pages[0].title !== '');
});
