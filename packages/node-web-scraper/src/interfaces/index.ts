interface ScraperConfig {
  target: string;
  fetch: ScrapeOptions;
}

interface ScraperConfigPuppeteer extends ScraperConfig {
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

interface ScrapeResult<T> {
  data: T;
}

export {
  ScraperConfig,
  ScraperConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
};
