import scrape, { ScrapeConfig } from '@web-master/node-web-scraper';
import crawl, { CrawlConfig } from '@web-master/node-web-crawler';

const isScrapeConfig = (config: any): config is ScrapeConfig => {
  return typeof (config as ScrapeConfig).target === 'string';
};

const isCrawlConfig = (config: any): config is CrawlConfig => {
  return !isScrapeConfig(config);
};

async function fetch<T>(config: ScrapeConfig | CrawlConfig): Promise<T> {
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
