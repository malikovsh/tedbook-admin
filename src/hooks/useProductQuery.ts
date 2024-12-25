import productsApi from '@/api/requests/productsApi';
import { useToast } from '@/components/ui/use-toast';
import { CreateProductsBodyType } from '@/types/productsType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from './useQuery';

export const useProductQuery = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 25,
  });
  const query = useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      return await productsApi.getAll(params);
    },
    initialPageParam: params,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page < lastPage?.totalPages) {
        return { ...params, page: lastPage?.page + 1 };
      }
      return undefined;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const resData = useMemo(
    () =>
      query.data?.pages
        .filter(Boolean)
        .flatMap((page) => page?.products || []) || [],
    [query.data],
  );

  // Ensure the data is always an array before mapping
  const options = useMemo(() => {
    if (resData && Array.isArray(resData)) {
      return resData.map((item: any) => ({
        label: item.title,
        value: item._id,
      }));
    }
    // Return an empty array if the data is undefined or not an array
    return [];
  }, [resData]);

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

  return { ...query, resData, options, pagination, setPage, setPageSize };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (body: CreateProductsBodyType) => {
      return await productsApi.create(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: t('toastMessages.settings.products.create.success.title'),
        description: t('toastMessages.settings.products.create.success.desc'),
      });
      toast({
        title: 'Eslatma!',
        description: "Ushbu mahsulotni omborga ham qo'shing",
      });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        title: t('toastMessages.settings.products.create.error.title'),
        description: t('toastMessages.settings.products.create.error.desc'),
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: CreateProductsBodyType;
    }) => {
      return await productsApi.update(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: t('toastMessages.settings.products.update.success.title'),
        description: t('toastMessages.settings.products.update.success.desc'),
      });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        title: t('toastMessages.settings.products.update.error.title'),
        description: t('toastMessages.settings.products.update.error.desc'),
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      return await productsApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: t('toastMessages.settings.products.delete.success.title'),
        description: t('toastMessages.settings.products.delete.success.desc'),
      });
      toast({
        title: 'Eslatma!',
        description: "Ushbu mahsulotni ombordan ham o'chiring",
      });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        title: t('toastMessages.settings.products.delete.error.title'),
        description: t('toastMessages.settings.products.delete.error.desc'),
        variant: 'destructive',
      });
    },
  });
};
