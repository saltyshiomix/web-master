import {
  isScrapeConfigDefault,
  isScrapeConfigPuppeteer,
} from './utils';
import {
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
} from './interfaces';
import { FetchResult } from './types';

async function scrape<T>(config: ScrapeConfig | ScrapeConfigPuppeteer): Promise<FetchResult<T>> {
  if (isScrapeConfigDefault(config)) {
    return (await import('./scrapers/default')).default(config);
  }
  if (isScrapeConfigPuppeteer(config)) {
    return (await import('./scrapers/puppeteer')).default(config);
  }
  throw new Error('InvalidProgramException');
}

export {
  scrape,
  isScrapeConfigDefault,
  isScrapeConfigPuppeteer,
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
  FetchResult,
};

export default scrape;
