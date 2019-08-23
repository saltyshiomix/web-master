import {
  crawl,
  CrawlerConfig,
} from '@web-master/node-web-crawler';
import {
  scrape,
  ScraperConfig,
} from '@web-master/node-web-scraper';

const isCrawlerConfig = (config: any): config is CrawlerConfig => {
  return !isScraperConfig(config);
}

const isScraperConfig = (config: any): config is ScraperConfig => {
  return typeof config.target === 'string';
}

type TResult<T> = T extends Array<infer R> ? R[] : T;

async function fetch<T>(config: CrawlerConfig | ScraperConfig): Promise<TResult<T>> {
  if (isCrawlerConfig(config)) {
    return crawl(config) as Promise<TResult<T>>;
  }
  if (isScraperConfig(config)) {
    return scrape(config);
  }
  throw new Error('config must be one of CrawlerConfig or ScraperConfig');
}

export {
  fetch,
  CrawlerConfig,
  ScraperConfig,
};

export default fetch;
