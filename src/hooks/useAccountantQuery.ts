import accountantApi from '@/api/requests/accountantApi';
import { useInfiniteQuery } from './useQuery';
import { useMemo, useState } from 'react';

export const useAccountantQuery = (id: string, role: string) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });
  const query = useInfiniteQuery({
    queryKey: ['dashboardData', id, role, params],
    queryFn: async () => {
      return await accountantApi.getAccountantData({ id, role, ...params });
    },
    initialPageParam: params,
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return { ...params, page: lastPage?.currentPage + 1 };
      }
      return undefined;
    },
  });

  const resData = useMemo(
    () =>
      query.data?.pages.filter(Boolean).flatMap((page) => page?.data || []) ||
      [],
    [query.data],
  );

  const pagination = useMemo(
    () => ({
      pageIndex:
        query.data?.pages[query.data.pages.length - 1]?.currentPage || 1,
      pageSize: params.limit,
      total: query.data?.pages[0]?.totalProducts || 0,
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
