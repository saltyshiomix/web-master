import {
  scrape,
  isScrapeConfigDefault,
  isScrapeConfigPuppeteer,
  ScrapeConfig,
  ScrapeConfigPuppeteer,
  ScrapeOptions,
} from '@web-master/node-web-scraper';
import {
  UrlHolder,
  CrawlConfig,
  CrawlConfigPuppeteer,
  CrawlLinkOptions,
} from './interfaces';

const isArrayString = (value: any): boolean => {
  if (Array.isArray(value)) {
    let isNotString: boolean = false;
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      if (typeof v !== 'string') {
        isNotString = true;
      }
    }
    if (!isNotString && 0 < value.length) {
      return true;
    }
  }
  return false;
}

const extractUrls = (holder: UrlHolder, convert?: (link: string) => string): string[] => {
  const urls: string[] = [];
  for (let i = 0; i < holder.urls.length; i++) {
    let { url } = holder.urls[i];
    if (convert) {
      url = convert(url);
    }
    urls.push(url);
  }
  return urls;
}

const resolve = async (possibleUrls: string[] | CrawlLinkOptions): Promise<[string[], any]> => {
  if (isArrayString(possibleUrls)) {
    return [possibleUrls as string[], undefined];
  }

  const { url, iterator, fetch } = possibleUrls as CrawlLinkOptions;

  let holder: UrlHolder;
  if (typeof iterator === 'string') {
    holder = await scrape({
      target: url,
      fetch: {
        urls: {
          listItem: iterator,
          data: {
            url: { attr: 'href' },
          },
        },
      },
    });

    const urls = extractUrls(holder);
    if (fetch) {
      return [urls, await scrape<any>({ target: url, fetch })];
    }
    return [urls, undefined];
  } else {
    const { selector, convert } = iterator;
    holder = await scrape({
      target: url,
      fetch: {
        urls: {
          listItem: selector,
          data: {
            url: { attr: 'href' },
          },
        },
      },
    });

    const urls = extractUrls(holder, convert);
    if (fetch) {
      return [urls, await scrape<any>({ target: url, fetch })];
    }
    return [urls, undefined];
  }
}

async function crawl<T>(config: CrawlConfig | CrawlConfigPuppeteer): Promise<T[]> {
  if (isScrapeConfigDefault(config)) {
    const { target, fetch } = config;
    const [urls, data] = await resolve(target);
    return crawlAll<T>(urls, fetch, data);
  }
  if (isScrapeConfigPuppeteer(config)) {
    const { target, fetch, waitFor } = config;
    const [urls, data] = await resolve(target);
    return crawlAll<T>(urls, fetch, data, waitFor);
  }
  throw new Error('InvalidProgramException');
}

async function crawlAll<T>(urls: string[], fetch: (data?: any, index?: number) => ScrapeOptions, data: any, waitFor?: number): Promise<T[]> {
  const results: any[] = [];
  for (let i = 0; i < urls.length; i++) {
    let config: ScrapeConfig | ScrapeConfigPuppeteer = {
      target: urls[i],
      fetch: fetch(data, i),
    };
    if (waitFor) {
      config = Object.assign(config, { waitFor });
    }
    results.push(await scrape<T>(config));
  }
  return results;
}

export {
  crawl,
  CrawlConfig,
  CrawlConfigPuppeteer,
  CrawlLinkOptions,
};

export default crawl;
