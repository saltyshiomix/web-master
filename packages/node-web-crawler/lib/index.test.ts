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
        selector: 'span.age > a',
        convert: (path) => `https://news.ycombinator.com/${path}`,
      },
    },
    fetch: (data, index, url) => {
      t.log(url);
      t.log(data);
      return {
        title: '.title',
      };
    },
  });

  t.is(pages.length, 30);




  t.log(pages[0]);




  t.true(pages[0].title !== '');
});

// test('it can crawl multi pages (waitable)', async t => {
//   interface HackerNewsPage {
//     title: string;
//   }

//   const pages: HackerNewsPage[] = await crawl({
//     target: {
//       url: 'https://news.ycombinator.com',
//       iterator: {
//         selector: 'span.age > a',
//         convert: (path) => `https://news.ycombinator.com/${path}`,
//       },
//     },
//     waitFor: 1 * 1000,
//     fetch: () => ({
//       title: '.title',
//     }),
//   });

//   t.is(pages.length, 30);
//   t.true(pages[0].title !== '');
// });
