import scrape from '@web-master/node-web-scraper';
import crawl from '@web-master/node-web-crawler';
import {
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  CrawlConfig,
  CrawlConfigPuppeteer,
} from '../../../interfaces';

const isScrapeConfig = (config: any): config is ScrapeConfig | ScrapeConfigPuppeteer => {
  return typeof config.target === 'string';
}

const isCrawlConfig = (config: any): config is CrawlConfig | CrawlConfigPuppeteer => {
  return !isScrapeConfig(config);
}

async function fetch<T>(config: ScrapeConfig | ScrapeConfigPuppeteer | CrawlConfig | CrawlConfigPuppeteer): Promise<T> {
  let result: any;
  if (isScrapeConfig(config)) {
    result = scrape<T>(config);
  }
  if (isCrawlConfig(config)) {
    result = crawl<T>(config);
  }
  return result;
}

export default fetch;
