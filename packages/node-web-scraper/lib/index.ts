import { ScrapeConfig } from '../interfaces';

const getConfigType = (config: any): 'default' | 'puppeteer' => {
  return typeof (config as ScrapeConfig).waitFor === 'number' ? 'puppeteer' : 'default';
}

async function scrape<T>(config: ScrapeConfig): Promise<T> {
  return (await import(`./scrapers/${getConfigType(config)}`)).default(config);
}

export default scrape;
