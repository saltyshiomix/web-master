import * as puppeteer from 'puppeteer';
import * as htmlparser2 from 'htmlparser2';
import { Node } from 'domhandler';
import { ScrapeConfig } from '../../../../interfaces';
import core from './core';

const parseDOM = async (url: string, waitFor: number): Promise<Node[]> => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(waitFor);

  const handle = await page.evaluateHandle(() => document.documentElement.innerHTML);
  const nodes = htmlparser2.parseDOM(await handle.jsonValue(), {
    xmlMode: true,
    decodeEntities: true,
    normalizeWhitespace: false,
  });

  await browser.close();

  return nodes;
};

async function scrape<T>(config: ScrapeConfig): Promise<T> {
  const { target, waitFor, fetch } = config;
  const nodes: Node[] = await parseDOM(target, waitFor as number);
  return core(fetch, nodes);
}

export default scrape;
