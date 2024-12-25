import warehouseReturnApi from '@/api/requests/warehouseReturnApi';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from './useQuery';

export const useWarehouseReturnQuery = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });

  const query = useInfiniteQuery({
    queryKey: ['warehouseReturn', params],
    queryFn: async () => {
      return await warehouseReturnApi.getAll(params);
    },
    initialPageParam: params,
    getNextPageParam: (lastPage) => {
      // Ensure `lastPage` and `lastPage.data` exist before accessing their properties
      if (
        lastPage?.data?.page &&
        lastPage?.data?.page < lastPage?.data?.totalPages
      ) {
        return { ...params, page: lastPage.data.page + 1 };
      }
      return undefined; // No more pages to fetch
    },
  });

  const resData = useMemo(
    () =>
      query.data?.pages
        ?.filter(Boolean)
        ?.flatMap((page) => page?.data?.orders || []) || [],
    [query.data],
  );

  const pagination = useMemo(
    () => ({
      pageIndex:
        query.data?.pages?.[query.data.pages.length - 1]?.data?.page || 1,
      pageSize: params.limit,
      total: query.data?.pages?.[0]?.data?.total || 0,
      totalPages:
        query.data?.pages?.[query.data.pages.length - 1]?.data?.totalPages || 1,
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
