import {
  isConfigDefault,
  isConfigPuppeteer,
} from './utils';
import {
  ScraperConfig,
  ScraperConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
} from './interfaces';

async function scrape<T>(config: ScraperConfig | ScraperConfigPuppeteer): Promise<T> {
  if (isConfigDefault(config)) {
    return (await import('./scrapers/default')).default(config);
  }
  if (isConfigPuppeteer(config)) {
    return (await import('./scrapers/puppeteer')).default(config);
  }
  throw new Error('InvalidProgramException');
}

export {
  scrape,
  ScraperConfig,
  ScraperConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
};

export default scrape;
