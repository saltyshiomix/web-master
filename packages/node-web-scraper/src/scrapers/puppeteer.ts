import * as puppeteer from 'puppeteer';
import * as htmlparser2 from 'htmlparser2';
import {
  selectOne,
  selectAll,
} from 'css-select';
import {
  getText,
  getAttributeValue,
} from 'domutils';
import {
  Node,
  Element,
} from 'domhandler';
import {
  isOptionString,
  isOptionElement,
  isOptionList,
} from '../utils';
import {
  ScraperConfigPuppeteer,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
} from '../interfaces';
import { FetchResult } from '../types';

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

const evaluate = <T>(options: ScrapeOptions, nodes: Node | Node[]): T => {
  const result: any = {};

  const keys: string[] = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    const key: string = keys[i];
    const option: string | ScrapeOptionElement | ScrapeOptionList = options[key];
    result[key] = performEvaluate(option, nodes);
  }

  return result;
};

const performEvaluate = <T>(option: string | ScrapeOptionElement | ScrapeOptionList, nodes: Node | Node[]): FetchResult<T> => {
  if (isOptionString(option)) {
    return evaluateOptionString(option, nodes);
  }
  if (isOptionElement(option)) {
    return evaluateOptionElement(option, nodes);
  }
  if (isOptionList(option)) {
    return evaluateOptionList(option, nodes);
  }
  throw new Error('InvalidProgramException');
};

const evaluateOptionString = <T>(options: string, nodes: Node | Node[]): T => {
  let result: any = null;

  const node: Node | null = selectOne(options, nodes);
  if (node) {
    result = getText(node);
  }

  return result;
};

const evaluateOptionElement = <T>(options: ScrapeOptionElement, nodes: Node | Node[]): T => {
  let result: any = null;
  let node: Node | null = Array.isArray(nodes) ? nodes[0] : nodes;

  if (options.selector) {
    node = selectOne(options.selector, nodes);
    if (node) {
      result = getText(node);
    }
  }

  if (options.attr) {
    if (node) {
      result = getAttributeValue(node as Element, options.attr);
    }
  }

  if (options.convert) {
    result = options.convert(result);
  }

  return result;
};

const evaluateOptionList = <T>(options: ScrapeOptionList, nodes: Node | Node[]): FetchResult<T> => {
  const results: any[] = [];

  nodes = selectAll(options.listItem, nodes);
  for (let i = 0; i < nodes.length; i++) {
    const node: Node = nodes[i];
    let evaluated: any = getText(node);
    if (options.data) {
      evaluated = evaluate(options.data, node);
    }
    results.push(evaluated);
  }

  return results as FetchResult<T>;
};

async function scrape<T>(config: ScraperConfigPuppeteer): Promise<T> {
  const { target, waitFor, fetch } = config;
  return evaluate(fetch, await parseDOM(target, waitFor));
}

export default scrape;
