/// <reference types="cheerio" />

import * as scrapeIt from 'scrape-it';

interface ScrapeOptions {
  [key: string]: string | ScrapeOptionList | ScrapeOptionElement;
}

interface ScrapeOptionElement {
  selector?: string;
  convert?: (value: any) => any;
  how?: string | ((element: CheerioSelector) => any);
  attr?: string;
  trim?: boolean;
  closest?: string;
  eq?: number;
  texteq?: number;
}

interface ScrapeOptionList {
  listItem: string;
  data?: ScrapeOptions;
  convert?: (value: any) => any;
}

interface ScrapeResult<T> {
  data: T,
  $: Cheerio,
  response: any,
  body: string
}

interface ScraperConfig {
  target: string;
  fetch: ScrapeOptions;
}

async function scrape<T>(config: ScraperConfig): Promise<T> {
  const { target, fetch } = config;
  const { data } = await scrapeIt(target, fetch);
  return data;
}

export {
  scrape,
  ScraperConfig,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
};

export default scrape;
