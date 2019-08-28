export type FetchResult<T> = T extends Array<infer R> ? R[] : T;
