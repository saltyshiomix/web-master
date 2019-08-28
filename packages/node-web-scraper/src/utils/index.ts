import {
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  ScrapeOptionElement,
  ScrapeOptionList,
} from '../interfaces';

const isScrapeConfigDefault = (config: any): config is ScrapeConfig => {
  return !isScrapeConfigPuppeteer(config);
}

const isScrapeConfigPuppeteer = (config: any): config is ScrapeConfigPuppeteer => {
  return config.waitFor && typeof config.waitFor === 'number';
}

const isScrapeOptionString = (options: any): options is string => {
  return typeof options === 'string';
}

const isScrapeOptionElement = (options: any): options is ScrapeOptionElement => {
  return !isScrapeOptionString(options) && !isScrapeOptionList(options);
}

const isScrapeOptionList = (options: any): options is ScrapeOptionList => {
  return typeof options.listItem === 'string';
}

export {
  isScrapeConfigDefault,
  isScrapeConfigPuppeteer,
  isScrapeOptionString,
  isScrapeOptionElement,
  isScrapeOptionList,
};
