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

interface ScrapeResult<T> {
  data: T;
}

export {
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
};
