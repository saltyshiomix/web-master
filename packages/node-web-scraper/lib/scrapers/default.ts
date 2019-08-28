import * as got from 'got';
import * as htmlparser2 from 'htmlparser2';
import { Node } from 'domhandler';
import { ScrapeConfig } from '../../../../interfaces';
import core from './core';

async function scrape<T>(config: ScrapeConfig): Promise<T> {
  const { target, fetch } = config;
  const { body } = await got(target);
  const nodes: Node[] = htmlparser2.parseDOM(body);
  return core(fetch, nodes);
}

export default scrape;
