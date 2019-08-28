import { ScrapeConfig } from '../../../interfaces';
import { getConfigType } from '../../../utils';

async function scrape<T>(config: ScrapeConfig): Promise<T> {
  return (await import(`./scrapers/${getConfigType(config)}`)).default(config);
}

export default scrape;
