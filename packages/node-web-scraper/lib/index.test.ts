import test from 'ava';
import scrape from '.';

test('it can scrape one tag', async t => {
  interface ExampleCom {
    title: string;
  }

  const actual: ExampleCom = await scrape({
    target: 'http://example.com',
    fetch: {
      title: 'h1',
    },
  });

  t.is(actual.title, 'Example Domain');
});

test('it can scrape one innerHTML', async t => {
  interface ExampleCom {
    title: string;
  }

  const actual: ExampleCom = await scrape({
    target: 'http://example.com',
    fetch: {
      title: {
        selector: 'div',
        how: 'html',
        trim: true,
      },
    },
  });

  t.is(actual.title, 
`<h1>Example Domain</h1>
    <p>This domain is established to be used for illustrative examples in documents. You may use this
    domain in examples without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>`);
});

test('it can scrape one attribute', async t => {
  interface ExampleCom {
    info: string;
  }

  const actual: ExampleCom = await scrape({
    target: 'http://example.com',
    fetch: {
      info: {
        selector: 'p > a',
        attr: 'href',
      },
    },
  });

  t.is(actual.info, 'https://www.iana.org/domains/example');
});

test('it can scrape one hacker news title', async t => {
  interface HackerNews {
    title: string;
  }

  const actual: HackerNews = await scrape({
    target: 'https://news.ycombinator.com/item?id=20821022',
    fetch: {
      title: '.title > a',
    },
  });

  t.is(actual.title, 'How we reduced deployment times by 95%');
});

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
  t.is(actual.info, 'https://www.iana.org/domains/example');
});

test('it can scrape one page as a object (waitable)', async t => {
  interface ExampleCom {
    title: string;
    info: string;
  }

  const actual: ExampleCom = await scrape({
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
  t.is(actual.info, 'https://www.iana.org/domains/example');
});

test('it can scrape one page as a list object', async t => {
  interface WikiSite {
    url: string;
  }

  interface Wikipedia {
    sites: WikiSite[];
  }

  const actual: Wikipedia = await scrape({
    target: 'https://www.wikipedia.org',
    fetch: {
      sites: {
        listItem: '.central-featured a.link-box',
        data: {
          url: {
            attr: 'href',
            convert: (x: string) => `https:${x}`,
          },
        },
      },
    },
  });

  t.is(actual.sites.length, 10);
  t.true(actual.sites[0].url.indexOf('https://') === 0);
});
