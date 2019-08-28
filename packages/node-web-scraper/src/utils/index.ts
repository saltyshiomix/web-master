import {
  ScraperConfig,
  ScraperConfigPuppeteer,
  ScrapeOptionElement,
  ScrapeOptionList,
} from '../interfaces';

const isConfigDefault = (config: any): config is ScraperConfig => {
  return !isConfigPuppeteer(config);
}

const isConfigPuppeteer = (config: any): config is ScraperConfigPuppeteer => {
  return config.waitFor && typeof config.waitFor === 'number';
}

const isOptionString = (options: any): options is string => {
  return typeof options === 'string';
}

const isOptionElement = (options: any): options is ScrapeOptionElement => {
  return !isOptionString(options) && !isOptionList(options);
}

const isOptionList = (options: any): options is ScrapeOptionList => {
  return typeof options.listItem === 'string';
}

export {
  isConfigDefault,
  isConfigPuppeteer,
  isOptionString,
  isOptionElement,
  isOptionList,
};
