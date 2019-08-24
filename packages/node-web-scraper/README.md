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

## TypeScript Support

First, add `@types/cheerio` as dev dependencies:

```bash
$ npm install --save-dev @types/cheerio
```

Then, just use it with interfaces or types:

```ts
import scrape from '@web-master/node-web-scraper';

interface Wikipadia {
  urls: string[];
}

const data: Wikipadia = await scrape({
  target: 'https://www.wikipedia.org',
  fetch: {
    urls: {
      listItem: '.central-featured-lang',
      data: {
        url: {
          selector: 'a',
          attr: 'href',
          convert: (x: string) => `https:${x}`,
        },
      },
    },
  },
});

console.log(data);

// [
//   'https://en.wikipedia.org/',
//   'https://ja.wikipedia.org/',
//   ...
//   ...
//   'https://de.wikipedia.org/'
// ]
```

## Related

- [@web-master/node-web-fetch](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-fetch)
- [@web-master/node-web-crawler](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-crawler)