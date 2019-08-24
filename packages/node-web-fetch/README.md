<p align="center">😎 @web-master/node-web-fetch 😎</p>
<p align="center">Fetch web data as easy as possible</p>
<p align="center">
  <a href="https://npm.im/@web-master/node-web-fetch" alt="A version of @web-master/node-web-fetch">
    <img src="https://img.shields.io/npm/v/@web-master/node-web-fetch.svg">
  </a>
  <a href="https://npm.im/@web-master/node-web-fetch" alt="Downloads of @web-master/node-web-fetch">
    <img src="https://img.shields.io/npm/dt/@web-master/node-web-fetch.svg">
  </a>
  <img src="https://img.shields.io/npm/l/@web-master/node-web-fetch.svg" alt="Package License (MIT)">
</p>

## Description

It is the combination of [@web-master/node-web-crawler](https://npm.im/@web-master/node-web-crawler) and [@web-master/node-web-scraper](https://npm.im/@web-master/node-web-scraper).

It can:

- FETCH
  - SCRAPE
    - It scrapes the specific page
    - It gathers data from the page according to the `ScraperConfig`
  - CRAWL
    - It scrapes the specific page and gather links
    - It crawls the links and scrapes each page of the link
    - It gathers data from each page according to `CrawlerConfig`

## Installation

```bash
$ npm install --save @web-master/node-web-fetch
```

## Usage

### Single Page Scraping

```js
import fetch from '@web-master/node-web-fetch';

const data = await fetch({
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

### Multi Pages Crawling

#### You Know the target urls already

```js
import fetch from '@web-master/node-web-fetch';

const data = await fetch({
  target: [
    'https://example1.com',
    'https://example2.com',
    'https://example3.com',
  ],
  fetch: {
    title: '.title',
  },
});

console.log(data);

// [
//   { title: 'An easiest crawling and scraping module for NestJS' },
//   { title: 'A minimalistic boilerplate on top of Webpack, Babel, TypeScript and React' },
//   { title: '[Experimental] React SSR as a view template engine' }
// ]
```

#### You Don't Know the Target Urls so Want to Crawl Dynamically

```js
import fetch from '@web-master/node-web-fetch';

const data = await fetch({
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
import fetch from '@web-master/node-web-fetch';

interface HackerNewsPage {
  title: string;
}

const data: HackerNewsPage[] = await fetch({
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

- [@web-master/node-web-scraper](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-scraper)
- [@web-master/node-web-crawler](https://github.com/saltyshiomix/web-master/blob/master/packages/node-web-crawler)
