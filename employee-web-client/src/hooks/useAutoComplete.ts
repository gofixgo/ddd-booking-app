import { useEffect, useRef, useState } from 'react';
import { uniqBy } from 'lodash';
import { BehaviorSubject, EMPTY, NEVER, pipe, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { buildUrl } from 'utils';
import { getJSON, ServiceType } from 'utils/http';
import { ICollection, IQueryParams, RequestStatus } from 'types';
import { useRequestStatus } from 'hooks';

type Options<Item, Response> = {
  url: string;
  limit?: number;
  offsetKey?: string;
  queryKey?: string;
  map?: (response: Response) => Array<unknown>;
  params?: object;
  initialData?: Array<Item>;
  reFetchWhenChange?: (string | undefined | number)[];
};

export function useAutoComplete<
  Item,
  Response extends ICollection = ICollection,
  Params extends Record<string, string | number | undefined> = IQueryParams
>({
  url,
  limit = 20,
  offsetKey = 'offset',
  queryKey = 'query',
  map: mapFn = response => response.collection,
  params = {},
  initialData,
  reFetchWhenChange = [],
}: Options<Item, Response>) {
  const [data, setData] = useState<Array<Item>>(initialData ?? []);
  const [error, setError] = useState();
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useRequestStatus();

  const { current: search$ } = useRef(new BehaviorSubject<string>(''));
  const { current: pagination$ } = useRef(new Subject<number>());

  const fetchData$ = (params: Params) => {
    setStatus(RequestStatus.InProgress);
    return getJSON<Response>(buildUrl(url, params), ServiceType.Management).pipe(
      map((response: Response) => {
        setTotal(response.meta.total);
        return mapFn(response) as Array<Item>;
      }),
      tap(response => {
        setOffset(params[offsetKey] as number);
        setData(state => uniqBy([...state, ...response], 'value'));
        setStatus(RequestStatus.Done);
      }),
      catchError(err => {
        setError(err);
        setStatus(RequestStatus.Failure);
        return EMPTY;
      }),
    );
  };

  const mapParams$ = map(({ query, offset, limit }: Params) => {
    if (query === '') {
      return {
        limit,
        [offsetKey]: offset,
        ...params,
      };
    }
    return { [queryKey]: query, [offsetKey]: offset, limit, ...params };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  useEffect(() => {
    search$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(value => {
          return {
            limit,
            offset: 0,
            query: value,
            ...params,
          };
        }),
        mapParams$,
        switchMap((value: Params) => {
          if ((value[queryKey] as string)?.length < 3) {
            return NEVER;
          }

          return fetchData$(value);
        }),
      )
      .subscribe();

    const subscriber = pagination$
      .pipe(
        withLatestFrom(search$),
        map(value => {
          return {
            limit,
            offset: value[0],
            query: value[1],
          };
        }),
        pipe(mapParams$, switchMap(fetchData$)),
      )
      .subscribe();

    return () => {
      subscriber.unsubscribe();
    };
  }, [...reFetchWhenChange]);

  const nextPage = () => {
    if (total === data.length) return;
    pagination$.next(offset + limit);
  };

  const search = (query: string) => {
    search$.next(query);
  };

  return {
    nextPage,
    search,
    data,
    status,
    error,
  };
}
