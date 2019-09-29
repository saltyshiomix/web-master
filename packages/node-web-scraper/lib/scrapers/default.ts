import * as scrapeIt from 'scrape-it';
import { ScrapeConfig } from '../../interfaces';

export default async function scrape<T>(config: ScrapeConfig): Promise<T> {
  const { target, fetch } = config;
  const { data } = await scrapeIt<T>(target, fetch);
  return data;
}
