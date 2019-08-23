<p align="center">😎 @web-master/node-web-crawler 😎</p>
<p align="center">Crawl web as easy as possible</p>
<p align="center">
  <a href="https://npm.im/@web-master/node-web-crawler" alt="A version of @web-master/node-web-crawler">
    <img src="https://img.shields.io/npm/v/@web-master/node-web-crawler.svg">
  </a>
  <a href="https://npm.im/@web-master/node-web-crawler" alt="Downloads of @web-master/node-web-crawler">
    <img src="https://img.shields.io/npm/dt/@web-master/node-web-crawler.svg">
  </a>
</p>

## Description

It crawls the target page, collects links and scrapes data on each link page :)

## Installation

```bash
$ npm install --save @web-master/node-web-crawler
```

## Usage

```js
import crawl from '@web-master/node-web-crawler';

// crawl data on each link
const data = await crawl({
  target: {
    url: 'https://news.ycombinator.com',
    iterator: {
      selector: 'span.age > a',
      convert: (path) => `https://news.ycombinator.com/${path}`,
    },
  },
  fetch: {
    title: '.title',
  },
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

First, add `@types/cheerio` as dev dependencies:

```bash
$ npm install --save-dev @types/cheerio
```

Then, just use it with interfaces or types:

```ts
import crawl from '@web-master/node-web-crawler';

interface HackerNewsPage {
  title: string;
}

const data: HackerNewsPage[] = await crawl({
  target: {
    url: 'https://news.ycombinator.com',
    iterator: {
      selector: 'span.age > a',
      convert: (path) => `https://news.ycombinator.com/${path}`,
    },
  },
  fetch: {
    title: '.title',
  },
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

## Related

- [@web-master/node-web-fetch](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-fetch)
- [@web-master/node-web-scraper](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-scraper)
