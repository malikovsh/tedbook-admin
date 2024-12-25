import warehouseHistoryApi from '@/api/requests/warehouseHistoryApi';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from './useQuery';

export const useWarehouseHistoryQuery = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });

  const query = useInfiniteQuery({
    queryKey: ['warehouseHistory', params],
    queryFn: async () => {
      const response = await warehouseHistoryApi.getAll(params);
      return response;
    },
    initialPageParam: params,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.page && lastPage?.data?.totalPages) {
        if (lastPage.data.page < lastPage.data.totalPages) {
          return { ...params, page: lastPage.data.page + 1 };
        }
      }
      return undefined;
    },
  });

  const resData = useMemo(
    () =>
      query.data?.pages
        .filter(Boolean)
        .flatMap((page) => page?.data.stockHistory || []) || [],
    [query.data],
  );

  const pagination = useMemo(() => {
    const lastPageData = query.data?.pages?.[query.data.pages.length - 1]?.data;
    const firstPageData = query.data?.pages?.[0]?.data;

    return {
      pageIndex: lastPageData?.page || 1,
      pageSize: params.limit,
      total: firstPageData?.total || 0,
      totalPages: lastPageData?.totalPages || 1,
    };
  }, [params, query.data]);

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
