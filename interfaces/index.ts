interface UrlObject {
  url: string;
}

interface UrlHolder {
  urls: UrlObject[];
}

interface ScrapeConfig {
  target: string;
  waitFor?: number;
  fetch: ScrapeOptions;
}

interface ScrapeOptions {
  [key: string]: string | ScrapeOptionElement | ScrapeOptionList;
}

interface ScrapeOptionElement {
  selector?: string;
  attr?: string;
  convert?: (value: any) => any;
}

interface ScrapeOptionList {
  listItem: string;
  data?: ScrapeOptions;
}

interface CrawlConfig {
  target: string[] | CrawlLinkOptions;
  waitFor?: number;
  fetch: (data: any, index: number, url: string) => ScrapeOptions;
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
  UrlHolder,
  ScrapeConfig,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  CrawlConfig,
  CrawlLinkOptions,
};
