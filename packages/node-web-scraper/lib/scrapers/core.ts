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
  isScrapeOptionString,
  isScrapeOptionElement,
  isScrapeOptionList,
} from '../../../../utils';
import {
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
} from '../../../../interfaces';

type FetchResult<T> = T extends Array<infer R> ? R[] : T;

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

const performEvaluate = <T>(option: string | ScrapeOptionElement | ScrapeOptionList, nodes: Node | Node[]): T => {
  let result: any;
  if (isScrapeOptionString(option)) {
    result = evaluateOptionString(option, nodes);
  }
  if (isScrapeOptionElement(option)) {
    result = evaluateOptionElement(option, nodes);
  }
  if (isScrapeOptionList(option)) {
    result = evaluateOptionList(option, nodes);
  }
  return result;
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
  let result: any = getText(nodes);
  let node: Node | null = Array.isArray(nodes) ? null : nodes;
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

async function scrape<T>(options: ScrapeOptions, nodes: Node | Node[]): Promise<T> {
  return evaluate(options, nodes);
}

export default scrape;
