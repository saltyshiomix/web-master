<p align="center">😎 @web-master/node-web-scraper 😎</p>
<p align="center">Scrape web as easy as possible</p>
<p align="center">
  <a href="https://npm.im/@web-master/node-web-scraper" alt="A version of @web-master/node-web-scraper">
    <img src="https://img.shields.io/npm/v/@web-master/node-web-scraper.svg">
  </a>
  <a href="https://npm.im/@web-master/node-web-scraper" alt="Downloads of @web-master/node-web-scraper">
    <img src="https://img.shields.io/npm/dt/@web-master/node-web-scraper.svg">
  </a>
  <img src="https://img.shields.io/npm/l/@web-master/node-web-scraper.svg" alt="Package License (MIT)">
</p>

## Description

It scrapes the specific page :)

## Installation

```bash
$ npm install --save @web-master/node-web-scraper
```

## Usage

### Basic

```js
import scrape from '@web-master/node-web-scraper';

const data = await scrape({
  target: 'http://example.com',
  fetch: {
    title: 'h1',
    info: {
      selector: 'p > a',
      attr: 'href',
    },
  },
});

console.log(data);

// {
//   title: 'Example Domain',
//   info: 'http://www.iana.org/domains/example'
// }
```

### Waitable (by using `puppeteer`)

```js
import scrape from '@web-master/node-web-scraper';

const data = await scrape({
  target: 'https://news.ycombinator.com/item?id=20821022',
  waitFor: 3 * 1000, // wait for the content loaded! (like single page apps)
  fetch: {
    title: '[class="title"] > a',
  },
});

console.log(data);

// {
//   title: 'How we reduced deployment times by 95%'
// }
```

## TypeScript Support

```ts
import scrape from '@web-master/node-web-scraper';

interface WikiSite {
  url: string;
}

interface Wikipedia {
  sites: WikiSite[];
}

const wiki: Wikipedia = await scrape({
  target: 'https://www.wikipedia.org',
  fetch: {
    sites: {
      listItem: '[class="central-featured"] a[class="link-box"]',
      data: {
        url: {
          attr: 'href',
          convert: (x: string) => `https:${x}`,
        },
      },
    },
  },
});

console.log(wiki.sites);

// [
//   { url: 'https://en.wikipedia.org/' },
//   { url: 'https://ja.wikipedia.org/' },
//   ...
//   ...
//   { url: 'https://de.wikipedia.org/' }
// ]
```

## Related

- [IonicaBizau/scrape-it](https://github.com/IonicaBizau/scrape-it)
- [@web-master/node-web-fetch](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-fetch)
- [@web-master/node-web-crawler](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-crawler)
