import * as scrapeIt from 'scrape-it';
import * as puppeteer from 'puppeteer';
import { ScrapeConfig } from '../../interfaces';

export default async function scrape<T>(config: ScrapeConfig): Promise<T> {
  const { target, waitFor, fetch } = config;

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  await page.goto(target);
  if (waitFor) {
    await page.waitFor(waitFor);
  }

  const handle = await page.evaluateHandle(() => document.documentElement.innerHTML);
  const dom: string = await handle.jsonValue();
  const data = await scrapeIt.scrapeHTML<T>(dom, fetch);

  await browser.close();

  return data;
}
