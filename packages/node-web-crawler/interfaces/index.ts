import { ScrapeOptions } from '@web-master/node-web-scraper';

export interface UrlObject {
  url: string;
}

export interface UrlHolder {
  urls: UrlObject[];
}

export interface CrawlConfig {
  target: string[] | CrawlLinkOptions;
  waitFor?: number;
  fetch: (data: any, index: number, url: string) => ScrapeOptions;
}

export interface CrawlLinkOptions {
  url: string;
  iterator: string | {
    selector: string;
    convert?: (x: string) => string;
  };
  fetch?: ScrapeOptions;
}
