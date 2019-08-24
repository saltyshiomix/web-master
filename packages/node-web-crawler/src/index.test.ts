import test from 'ava';
import crawl from '.';

test('it can crawl multi pages', async t => {
  interface HackerNewsPage {
    title: string;
  }

  const pages: HackerNewsPage[] = await crawl({
    target: {
      url: 'https://news.ycombinator.com',
      crawl: {
        selector: 'span.age > a',
        convert: (path) => `https://news.ycombinator.com/${path}`,
      },
    },
    fetch: {
      title: '.title',
    },
  });

  t.is(pages.length, 30);
  t.true(pages[0].title !== '');
});
