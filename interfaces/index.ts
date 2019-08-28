interface UrlObject {
  url: string;
}

interface UrlHolder {
  urls: UrlObject[];
}

interface ScrapeConfig {
  target: string;
  fetch: ScrapeOptions;
}

interface ScrapeConfigPuppeteer extends ScrapeConfig {
  waitFor: number;
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
  fetch: (data?: any, index?: number, url?: string) => ScrapeOptions;
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
  UrlHolder,
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  CrawlConfig,
  CrawlConfigPuppeteer,
  CrawlLinkOptions,
};
