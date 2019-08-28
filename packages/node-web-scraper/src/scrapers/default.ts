/// <reference types="cheerio" />

import * as scrapeIt from 'scrape-it';
import { ScraperConfig } from '../interfaces';

async function scrape<T>(config: ScraperConfig): Promise<T> {
  const { target, fetch } = config;
  const { data } = await scrapeIt(target, fetch);
  return data;
}

export default scrape;
