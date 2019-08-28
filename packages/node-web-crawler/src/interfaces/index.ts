import { ScrapeOptions } from '@web-master/node-web-scraper';

interface UrlObject {
  url: string;
}

interface UrlHolder {
  urls: UrlObject[];
}

interface CrawlConfig {
  target: string[] | CrawlLinkOptions;
  fetch: (data?: any, index?: number) => ScrapeOptions;
}

interface CrawlConfigPuppeteer extends CrawlConfig {
  waitFor: number;
}

interface CrawlLinkOptions {
  url: string;
  iterator: string | {
    selector: string;
    convert?: (x: string) => string;
  };
  fetch?: ScrapeOptions;
}

export {
  UrlObject,
  UrlHolder,
  CrawlConfig,
  CrawlConfigPuppeteer,
  CrawlLinkOptions,
};
