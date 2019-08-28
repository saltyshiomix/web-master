import scrape from '@web-master/node-web-scraper';
import crawl from '@web-master/node-web-crawler';
import {
  ScrapeConfig,
  CrawlConfig,
} from '../../../interfaces';
import {
  isScrapeConfig,
  isCrawlConfig,
} from '../../../utils';

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
