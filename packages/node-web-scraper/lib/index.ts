import {
  ScrapeConfig,
  ScrapeConfigPuppeteer,
} from '../../../interfaces';
import {
  isScrapeConfigDefault,
  isScrapeConfigPuppeteer,
} from '../../../utils';

async function scrape<T>(config: ScrapeConfig | ScrapeConfigPuppeteer): Promise<T> {
  let result: any;
  if (isScrapeConfigDefault(config)) {
    result = (await import('./scrapers/default')).default(config);
  }
  if (isScrapeConfigPuppeteer(config)) {
    result = (await import('./scrapers/puppeteer')).default(config);
  }
  return result;
}

export default scrape;
