import {
  ScrapeConfig,
  ScrapeOptionElement,
  ScrapeOptionList,
  CrawlLinkOptions,
  CrawlConfig,
} from '../interfaces';

const getConfigType = (config: any): 'default' | 'puppeteer' => {
  return typeof config.waitFor === 'number' ? 'puppeteer' : 'default';
}

const isScrapeConfig = (config: any): config is ScrapeConfig => {
  return typeof (config as ScrapeConfig).target === 'string';
};

const isScrapeOptionString = (options: any): options is string => {
  return typeof options === 'string';
};

const isScrapeOptionElement = (options: any): options is ScrapeOptionElement => {
  return !isScrapeOptionString(options) && !isScrapeOptionList(options);
};

const isScrapeOptionList = (options: any): options is ScrapeOptionList => {
  return typeof options.listItem === 'string';
};

const isCrawlConfig = (config: any): config is CrawlConfig => {
  return !isScrapeConfig(config);
};

const isCrawlLinkOptions = (options: any): options is CrawlLinkOptions => {
  return typeof options === 'object' && typeof options.url === 'string';
};

export {
  getConfigType,
  isScrapeConfig,
  isScrapeOptionString,
  isScrapeOptionElement,
  isScrapeOptionList,
  isCrawlConfig,
  isCrawlLinkOptions,
};
