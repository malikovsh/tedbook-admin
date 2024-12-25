import ordersApi from '@/api/requests/ordersApi';
import { useToast } from '@/components/ui/use-toast';
import { CreateOrdersBodyType } from '@/types/ordersType';
import { useQueryClient } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation } from './useQuery';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useOrderQuery = (id: string) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });
  const [filterShift, setFilterShift] = useState<number | null>(null);

  const mutate = useInfiniteQuery({
    queryKey: ['orders', params],
    queryFn: async () => {
      const res = await ordersApi.getAll(id, params);
      return res.data;
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
      mutate.data?.pages
        .filter(Boolean)
        .flatMap((page) => page?.orders || []) || [],
    [mutate.data],
  );

  const filteredData = useMemo(() => {
    if (!filterShift) return resData;
    return (
      resData.filter((order) => order?.operatorId?.shift == filterShift) || []
    );
  }, [resData, filterShift]);

  const pagination = useMemo(
    () => ({
      pageIndex: mutate.data?.pages[mutate.data.pages.length - 1]?.page || 1,
      pageSize: params.limit,
      total: mutate.data?.pages[0]?.total || 0,
      totalPages:
        mutate.data?.pages[mutate.data.pages.length - 1]?.totalPages || 1,
    }),
    [params, mutate.data],
  );

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setPageSize = (size: number) => {
    setParams((prev) => ({ ...prev, limit: size }));
  };

  const setFilters = (filters: Record<string, any>) => {
    if (filters.operatorShift !== null) {
      setFilterShift(filters.operatorShift);
      delete filters.operatorShift;
    }
    if (Object.keys(filters).length === 0) {
      setParams((prev) => ({ ...prev, filter: undefined }));
      return;
    }
    setParams((prev) => ({
      ...prev,
      filter: JSON.stringify(filters),
    }));
  };

  return {
    ...mutate,
    resData,
    filteredData,
    pagination,
    setPage,
    setPageSize,
    setFilters,
  };
};

export const useGetOrderById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ordersApi.getById(id);
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (body: CreateOrdersBodyType) => {
      return await ordersApi.create(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: t('toastMessages.orders.create.success.title'),
        description: t('toastMessages.orders.create.success.desc'),
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: t('toastMessages.orders.create.error.title'),
        description: t('toastMessages.orders.create.error.desc'),
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: {
        courierId: string;
        status: string;
      };
    }) => {
      return await ordersApi.update(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: t('toastMessages.orders.update.success.title'),
        description: t('toastMessages.orders.update.success.desc'),
      });
    },
    onError: (error: any) => {
      console.error(error.response.data);
      toast({
        title: t('toastMessages.orders.update.error.title'),
        description: t('toastMessages.orders.update.error.desc'),
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      return await ordersApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: t('toastMessages.orders.delete.success.title'),
        description: t('toastMessages.orders.delete.success.desc'),
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: t('toastMessages.orders.delete.error.title'),
        description: t('toastMessages.orders.delete.error.desc'),
        variant: 'destructive',
      });
    },
  });
};
