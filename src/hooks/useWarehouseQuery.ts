import warehouseApi from '@/api/requests/warehouseApi';
import { useToast } from '@/components/ui/use-toast';
import { useInfiniteQuery } from '@/hooks/useQuery';
import {
  CreateWareHousBodyType,
  UpdateWareHousBodyType,
} from '@/types/warehuseType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next'

export const useWarehouseQuery = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });

  const query = useInfiniteQuery({
    queryKey: ['warehouse', params],
    queryFn: async () => {
      return await warehouseApi.getAll(params);
    },
    initialPageParam: params,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.data) {
        const { page, totalPages } = lastPage.data;
        if (page && totalPages && page < totalPages) {
          return { ...params, page: page + 1 };
        }
      }
      return undefined;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Safely access pages and ensure the structure is correct
  const resData = useMemo(() => {
    return query.data?.pages
      ? query.data.pages
          .filter(Boolean)
          .flatMap((page) => page?.data?.stocks || [])
      : [];
  }, [query.data]);

  // Ensure that options are generated safely
  const options = useMemo(() => {
    if (resData && Array.isArray(resData)) {
      return resData.map((item: any) => ({
        label: item.title,
        value: item._id,
      }));
    }
    return [];
  }, [resData]);

  // Safely calculate pagination values
  const pagination = useMemo(() => {
    if (!query.data || !query.data.pages || query.data.pages.length === 0) {
      return {
        pageIndex: 1,
        pageSize: params.limit,
        total: 0,
        totalPages: 1,
      };
    }

    const lastPage = query.data.pages[query.data.pages.length - 1]?.data || {};
    return {
      pageIndex: lastPage.page || 1,
      pageSize: params.limit,
      total: lastPage.total || 0,
      totalPages: lastPage.totalPages || 1,
    };
  }, [params, query.data]);

  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setPageSize = (size: number) => {
    setParams((prev) => ({ ...prev, limit: size }));
  };

  return { ...query, resData, options, pagination, setPage, setPageSize };
};

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // const { t } = useTranslation()

  return useMutation({
    mutationFn: async (body: CreateWareHousBodyType) => {
      return await warehouseApi.create(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse'] });
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Mahsulot yaratildi.',
      });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        title: 'Xatolik',
        description: 'Mahsulot yaratishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // const { t } = useTranslation()

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: UpdateWareHousBodyType;
    }) => {
      return await warehouseApi.update(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse'] });
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Mahsulot yangilandi.',
      });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        title: 'Xatolik',
        description: 'Mahsulot yangilanishida xatolik yuz berdi.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // const { t } = useTranslation()

  return useMutation({
    mutationFn: async (id: string) => {
      return await warehouseApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouse'] });
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Mahsulot muvaffaqiyatli o‘chirildi.',
      });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        title: 'Xatolik',
        description: 'Mahsulot o‘chirishda xatolik yuz berdi.',
        variant: 'destructive',
      });
    },
  });
};
