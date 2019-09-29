import * as scrapeIt from 'scrape-it';

export interface ScrapeConfig {
  target: string;
  waitFor?: number;
  fetch: scrapeIt.ScrapeOptions;
}
