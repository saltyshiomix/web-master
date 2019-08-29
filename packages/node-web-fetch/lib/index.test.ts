import test from 'ava';
import fetch from '.';

test('it can scrape one page as a object', async t => {
  interface ExampleCom {
    title: string;
    info: string;
  }

  const actual: ExampleCom = await fetch({
    target: 'http://example.com',
    fetch: {
      title: 'h1',
      info: {
        selector: 'p > a',
        attr: 'href',
      },
    },
  });

  t.is(actual.title, 'Example Domain');
  t.is(actual.info, 'http://www.iana.org/domains/example');
});

test('it can scrape one page as a object (waitable)', async t => {
  interface ExampleCom {
    title: string;
    info: string;
  }

  const actual: ExampleCom = await fetch({
    target: 'http://example.com',
    waitFor: 1 * 1000,
    fetch: {
      title: 'h1',
      info: {
        selector: 'p > a',
        attr: 'href',
      },
    },
  });

  t.is(actual.title, 'Example Domain');
  t.is(actual.info, 'http://www.iana.org/domains/example');
});

test('it can crawl multi pages', async t => {
  interface HackerNewsPage {
    title: string;
  }

  const pages: HackerNewsPage[] = await fetch({
    target: {
      url: 'https://news.ycombinator.com',
      iterator: {
        selector: 'span[class="age"] > a',
        convert: (x: string) => `https://news.ycombinator.com/${x}`,
      },
    },
    fetch: () => ({
      title: '[class="title"] > a',
    }),
  });

  t.is(pages.length, 30);
  t.true(pages[0].title !== '');
});

test('it can crawl multi pages (waitable)', async t => {
  interface HackerNewsPage {
    title: string;
  }

  const pages: HackerNewsPage[] = await fetch({
    target: {
      url: 'https://news.ycombinator.com',
      iterator: {
        selector: 'span[class="age"] > a',
        convert: (x: string) => `https://news.ycombinator.com/${x}`,
      },
    },
    waitFor: 1 * 1000,
    fetch: () => ({
      title: '[class="title"] > a',
    }),
  });

  t.is(pages.length, 30);
  t.true(pages[0].title !== '');
});
