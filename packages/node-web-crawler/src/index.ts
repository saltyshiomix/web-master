import {
  scrape,
  ScraperConfig,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
} from '@web-master/node-web-scraper';

interface UrlObject {
  url: string;
}

interface UrlHolder {
  urls: UrlObject[];
}

interface CrawlLinkOptions {
  url: string;
  crawl: string | {
    selector: string;
    convert?: (link: string) => string;
  };
  fetch?: ScrapeOptions;
}

interface CrawlerConfig {
  target: string[] | CrawlLinkOptions;
  fetch: (data?: any, index?: number) => ScrapeOptions;
}

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

  const { url, crawl, fetch } = possibleUrls as CrawlLinkOptions;

  let holder: UrlHolder;
  if (typeof crawl === 'string') {
    holder = await scrape({
      target: url,
      fetch: {
        urls: {
          listItem: crawl,
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
    const { selector, convert } = crawl;
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

async function crawl<T>(config: CrawlerConfig): Promise<T[]> {
  const { target, fetch } = config;
  const [urls, data] = await resolve(target);
  return crawlAll<T>(urls, fetch, data);
}

async function crawlAll<T>(urls: string[], fetch: (data?: any, index?: number) => ScrapeOptions, data: any): Promise<T[]> {
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    results.push(await scrape<T>({
      target: urls[i],
      fetch: fetch(data, i),
    }));
  }
  return results;
}

export {
  crawl,
  CrawlerConfig,
  CrawlLinkOptions,
  ScraperConfig,
  ScrapeOptions,
  ScrapeOptionElement,
  ScrapeOptionList,
  ScrapeResult,
};

export default crawl;
