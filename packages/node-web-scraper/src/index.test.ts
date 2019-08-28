import test from 'ava';
import scrape from '.';

test('it can scrape one page as a object', async t => {
  interface ExampleCom {
    title: string;
    info: string;
  }

  const actual: ExampleCom = await scrape({
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

test('it can scrape one page as a object (with waiting)', async t => {
  interface ExampleCom {
    title: string;
    info: string;
  }

  const actual: ExampleCom = await scrape({
    target: 'http://example.com',
    waitFor: 3 * 1000,
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

test('it can scrape one page as a list object', async t => {
  interface Wikipadia {
    urls: string[];
  }

  const actual: Wikipadia = await scrape({
    target: 'https://www.wikipedia.org',
    fetch: {
      urls: {
        listItem: '.central-featured-lang',
        data: {
          url: {
            selector: 'a',
            attr: 'href',
          },
        },
      },
    },
  });

  t.is(actual.urls.length, 10);
});
