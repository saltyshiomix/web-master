import * as scrapeIt from 'scrape-it';
import {
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
} from 'scrape-it';

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
