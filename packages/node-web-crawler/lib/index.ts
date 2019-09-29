import scrape, {
  ScrapeConfig,
  ScrapeOptions,
} from '@web-master/node-web-scraper';
import {
  UrlHolder,
  CrawlConfig,
  CrawlLinkOptions,
} from '../interfaces';

const isCrawlLinkOptions = (options: any): options is CrawlLinkOptions => {
  return typeof (options as CrawlLinkOptions).url === 'string';
};

const extractUrls = (holder: UrlHolder, convert?: (link: string) => string): string[] => {
  const urls: string[] = [];
  for (let i = 0; i < holder.urls.length; i++) {
    let { url } = holder.urls[i];
    urls.push(convert ? convert(url) : url);
  }
  return urls;
}

const generateConfig = (url: string, selector: string, waitFor?: number): ScrapeConfig => {
  let config: ScrapeConfig = {
    target: url,
    fetch: {
      urls: {
        listItem: selector,
        data: {
          url: {
            attr: 'href',
          },
        },
      },
    },
  };
  waitFor && (config = Object.assign(config, { waitFor }));
  return config;
}

const resolve = async (options: string[] | CrawlLinkOptions, waitFor?: number): Promise<[string[], any]> => {
  let urls: any[] = [];
  let data: any;

  if (isCrawlLinkOptions(options)) {
    const { url, iterator, fetch } = options;
    if (typeof iterator === 'string') {
      urls = extractUrls(await scrape(generateConfig(url, iterator, waitFor)));
    } else {
      const { selector, convert } = iterator;
      urls = extractUrls(await scrape(generateConfig(url, selector, waitFor)), convert);
    }
    data = fetch ? await scrape({ target: url, fetch }) : undefined;
  } else {
    urls = options;
    data = undefined;
  }

  return [urls, data];
}

async function crawl<T>(config: CrawlConfig): Promise<T[]> {
  const { target, waitFor, fetch } = config;
  const [urls, data] = await resolve(target, waitFor);
  return crawlAll(urls, fetch, data, waitFor);
}

async function crawlAll<T>(urls: string[], fetch: (data: any, index: number, url: string) => ScrapeOptions, data: any, waitFor?: number): Promise<T[]> {
  const results: any[] = [];
  for (let i = 0; i < urls.length; i++) {
    let config: ScrapeConfig = {
      target: urls[i],
      fetch: fetch(data, i, urls[i]),
    };
    waitFor && (config = Object.assign(config, { waitFor }));
    results.push(await scrape(config));
  }
  return results;
}

export default crawl;
