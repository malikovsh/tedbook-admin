import locationsApi from '@/api/requests/locationsApi';
import { useInfiniteQuery } from './useQuery';
import { useMemo, useState } from 'react';

export const useLocationsQuery = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });
  const query = useInfiniteQuery({
    queryKey: ['locations', params],
    queryFn: async () => {
      return await locationsApi.getAll(params);
    },
    initialPageParam: params,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page < lastPage?.totalPages) {
        return { ...params, page: lastPage?.page + 1 };
      }
      return undefined;
    },
  });

  const resData = useMemo(
    () =>
      query.data?.pages
        .filter(Boolean)
        .flatMap((page) => page?.locations || []) || [],
    [query.data],
  );

  const pagination = useMemo(
    () => ({
      pageIndex: query.data?.pages[query.data.pages.length - 1]?.page || 1,
      pageSize: params.limit,
      total: query.data?.pages[0]?.total || 0,
      totalPages:
        query.data?.pages[query.data.pages.length - 1]?.totalPages || 1,
    }),
    [params, query.data],
  );

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setPageSize = (size: number) => {
    setParams((prev) => ({ ...prev, limit: size }));
  };

  return {
    ...query,
    resData,
    pagination,
    setPage,
    setPageSize,
  };
};
