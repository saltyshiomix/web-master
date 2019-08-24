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
}

interface CrawlerConfig {
  target: string[] | CrawlLinkOptions;
  fetch: ScrapeOptions;
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

const resolve = async (possibleUrls: string[] | CrawlLinkOptions): Promise<string[]> => {
  if (isArrayString(possibleUrls)) {
    return possibleUrls as string[];
  }

  const { url, crawl: iterator } = possibleUrls as CrawlLinkOptions;
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
    return extractUrls(holder);
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
    return extractUrls(holder, convert);
  }
}

async function crawl<T>(config: CrawlerConfig): Promise<T[]> {
  const { target, fetch } = config;
  const urls: string[] = await resolve(target);
  return crawlAll<T>(urls, fetch);
}

async function crawlAll<T>(urls: string[], options: ScrapeOptions): Promise<T[]> {
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    results.push(await scrape<T>({
      target: urls[i],
      fetch: options,
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
