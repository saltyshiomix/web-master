import {
  scrape,
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  FetchResult,
} from '@web-master/node-web-scraper';
import {
  crawl,
  CrawlConfig,
  CrawlConfigPuppeteer,
} from '@web-master/node-web-crawler';

const isCrawlConfig = (config: any): config is CrawlConfig | CrawlConfigPuppeteer => {
  return !isScrapeConfig(config);
}

const isScrapeConfig = (config: any): config is ScrapeConfig | ScrapeConfigPuppeteer => {
  return typeof config.target === 'string';
}

async function fetch<T>(config: CrawlConfig | CrawlConfigPuppeteer | ScrapeConfig | ScrapeConfigPuppeteer): Promise<FetchResult<T>> {
  if (isCrawlConfig(config)) {
    return crawl<T>(config) as Promise<FetchResult<T>>;
  }
  if (isScrapeConfig(config)) {
    return scrape(config);
  }
  throw new Error('config must be one of CrawlerConfig or ScraperConfig');
}

export {
  fetch,
  FetchResult,
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  CrawlConfig,
  CrawlConfigPuppeteer,
};

export default fetch;
