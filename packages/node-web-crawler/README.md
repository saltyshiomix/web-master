<p align="center">😎 @web-master/node-web-crawler 😎</p>
<p align="center">Crawl web as easy as possible</p>
<p align="center">
  <a href="https://npm.im/@web-master/node-web-crawler" alt="A version of @web-master/node-web-crawler">
    <img src="https://img.shields.io/npm/v/@web-master/node-web-crawler.svg">
  </a>
  <a href="https://npm.im/@web-master/node-web-crawler" alt="Downloads of @web-master/node-web-crawler">
    <img src="https://img.shields.io/npm/dt/@web-master/node-web-crawler.svg">
  </a>
  <img src="https://img.shields.io/npm/l/@web-master/node-web-crawler.svg" alt="Package License (MIT)">
</p>

## Description

It crawls the target page, collects links and scrapes data on each page :)

## Installation

```bash
$ npm install --save @web-master/node-web-crawler
```

## Usage

### Basic

```js
import crawl from '@web-master/node-web-crawler';

// crawl data on each link
const data = await crawl({
  target: {
    url: 'https://news.ycombinator.com',
    iterator: {
      selector: 'span[class="age"] > a',
      convert: (x) => `https://news.ycombinator.com/${x}`,
    },
  },
  fetch: () => ({
    title: '[class="title"] > a',
  }),
});

console.log(data);
// [
//   { title: 'An easiest crawling and scraping module for NestJS' },
//   { title: 'A minimalistic boilerplate on top of Webpack, Babel, TypeScript and React' },
//   ...
//   ...
//   { title: '[Experimental] React SSR as a view template engine' }
// ]
```

### Waitable (by using `puppeteer`)

```js
import crawl from '@web-master/node-web-crawler';

// crawl data on each link
const data = await crawl({
  target: {
    url: 'https://news.ycombinator.com',
    iterator: {
      selector: 'span[class="age"] > a',
      convert: (x) => `https://news.ycombinator.com/${x}`,
    },
  },
  waitFor: 3 * 1000, // wait for the content loaded! (like single page apps)
  fetch: () => ({
    title: '[class="title"] > a',
  }),
});

console.log(data);
// [
//   { title: 'An easiest crawling and scraping module for NestJS' },
//   { title: 'A minimalistic boilerplate on top of Webpack, Babel, TypeScript and React' },
//   ...
//   ...
//   { title: '[Experimental] React SSR as a view template engine' }
// ]
```

## TypeScript Support

```ts
import crawl from '@web-master/node-web-crawler';

interface HackerNewsPage {
  title: string;
}

const pages: HackerNewsPage[] = await crawl({
  target: {
    url: 'https://news.ycombinator.com',
    iterator: {
      selector: 'span[class="age"] > a',
      convert: (x) => `https://news.ycombinator.com/${x}`,
    },
  },
  fetch: () => ({
    title: '[class="title"] > a',
  }),
});

console.log(pages);
// [
//   { title: 'An easiest crawling and scraping module for NestJS' },
//   { title: 'A minimalistic boilerplate on top of Webpack, Babel, TypeScript and React' },
//   ...
//   ...
//   { title: '[Experimental] React SSR as a view template engine' }
// ]
```

## Related

- [@web-master/node-web-fetch](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-fetch)
- [@web-master/node-web-scraper](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-scraper)
