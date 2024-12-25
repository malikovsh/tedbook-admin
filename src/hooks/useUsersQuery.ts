import usersApi from '@/api/requests/usersApi';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/constants/enum';
import { useAppDispatch } from '@/redux/store';
import { getMeThunk } from '@/redux/thunks/userThunk';
import { CreateUserBodyType, UpdateUserType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery, useMutation, useQuery } from './useQuery';

export const useGetAllUsers = () => {
    const [params, setParams] = useState({
        page: 1,
        limit: 25,
    });
    const query = useInfiniteQuery({
        queryKey: ['users', params],
        queryFn: async ({ pageParam = params }) => {
            const response = await usersApi.getAllUsers(pageParam);
            return response;
        },
        initialPageParam: params,
        getNextPageParam: (lastPage) => {
            if (lastPage?.currentPage < lastPage?.totalPages) {
                return { ...params, page: lastPage?.currentPage + 1 };
            }
            return undefined;
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    const resData = useMemo(
        () => query.data?.pages.flatMap((page) => page?.users || []) || [],
        [query.data]
    );

    const pagination = useMemo(
        () => ({
            pageIndex:
                query.data?.pages[query.data.pages.length - 1]?.currentPage ||
                1,
            pageSize: params.limit,
            total: query.data?.pages[0]?.totalUsers || 0,
            totalPages:
                query.data?.pages[query.data.pages.length - 1]?.totalPages || 1,
        }),
        [params, query.data]
    );

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setPageSize = (size: number) => {
        setParams((prev) => ({ ...prev, limit: size }));
    };

    const setSearch = (search: string) => {
        setParams((prev) => ({ ...prev, search }));
    };

    return {
        ...query,
        resData,
        pagination,
        setPage,
        setPageSize,
        setSearch,
    };
};

export const useGetAllUsersByRole = (role: keyof typeof UserRole) => {
    return useQuery({
        queryKey: ['users', role],
        queryFn: async () => {
            const response = usersApi.getAllUsersByRole(role);
            return response;
        },
        retryOnMount: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useGetAllUsersByRoleMutation = () => {
    return useMutation({
        mutationFn: async (role: keyof typeof UserRole) => {
            const response = usersApi.getAllUsersByRole(role);
            return response;
        },
        retry: 1,
    });
};

export const useLogisticianUsers = () => {
    return useQuery({
        queryKey: ['logistician'],
        queryFn: async () => {
            const response = usersApi.getAllUsersByRole('logistician');
            return response;
        },
        refetchOnReconnect: true,
    });
};

export const useCourierUsers = () => {
    return useQuery({
        queryKey: ['courier'],
        queryFn: async () => {
            const response = usersApi.getAllUsersByRole('courier');
            return response;
        },
        refetchOnReconnect: true,
    });
};

export const useOperatorOptions = () => {
    const query = useQuery({
        queryKey: ['operator'],
        queryFn: async () => {
            return usersApi.getAllUsersByRole('operator');
        },
        refetchOnReconnect: true,
    });

    // Ensure the data is always an array before mapping
    const options = useMemo(() => {
        if (query.data && Array.isArray(query.data.users)) {
            return query.data.users.map((item: any) => ({
                label: item.name,
                value: item._id,
            }));
        }
        // Return an empty array if the data is undefined or not an array
        return [];
    }, [query.data]);

    return { ...query, options };
};

export const useLogisticianOptions = () => {
    const query = useQuery({
        queryKey: ['logistician'],
        queryFn: async () => {
            return usersApi.getAllUsersByRole('logistician');
        },
        refetchOnReconnect: true,
    });

    // Ensure the data is always an array before mapping
    const options = useMemo(() => {
        if (query.data && Array.isArray(query.data.users)) {
            return query.data.users.map((item: any) => ({
                label: item.name,
                value: item._id,
            }));
        }
        // Return an empty array if the data is undefined or not an array
        return [];
    }, [query.data]);

    return { ...query, options };
};

export const useCourierOptions = () => {
    const query = useQuery({
        queryKey: ['courier'],
        queryFn: async () => {
            return usersApi.getAllUsersByRole('courier');
        },
        refetchOnReconnect: true,
    });

    // Ensure the data is always an array before mapping
    const options = useMemo(() => {
        if (query.data && Array.isArray(query.data.users)) {
            return query.data.users.map((item: any) => ({
                label: item.name,
                value: item._id,
            }));
        }
        // Return an empty array if the data is undefined or not an array
        return [];
    }, [query.data]);

    return { ...query, options };
};

export const useGetUserById = (id: string) => {
    return useMutation({
        mutationFn: async () => {
            const response = usersApi.getUserById(id);
            return response;
        },
        retry: 1,
    });
};

export const useGetMe = () => {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: async ({ myId }: { myId: string }) => {
            const response = dispatch(getMeThunk(myId));
            return response;
        },
        onError: (error) => {
            console.error(error);
        },
        retry: 1,
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async ({
            id,
            body,
        }: {
            id: string;
            body: UpdateUserType;
        }) => {
            return await usersApi.updateUser(id, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: t('toastMessages.users.edit.success.title'),
                description: t('toastMessages.users.edit.success.desc'),
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
            toast({
                title: t('toastMessages.users.edit.error.title'),
                description: t('toastMessages.users.edit.error.desc'),
                variant: 'destructive',
            });
        },
    });
};

export const useDisableUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async ({ id, body }: { id: string; body: FormData }) => {
            return await usersApi.disableUser(id, body);
        },
        onSuccess: (_, { body }) => {
            const isEnabled = body.get('isActive') === 'true';

            const titleKey = isEnabled
                ? 'toastMessages.users.actions.enable.success.title'
                : 'toastMessages.users.actions.disable.success.title';
            const descKey = isEnabled
                ? 'toastMessages.users.actions.enable.success.desc'
                : 'toastMessages.users.actions.disable.success.desc';

            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: t(titleKey),
                description: t(descKey),
            });
        },
        onError: (error: AxiosError, { body }) => {
            const isEnabled = body.get('isActive') === 'true';

            const titleKey = isEnabled
                ? 'toastMessages.users.actions.enable.error.title'
                : 'toastMessages.users.actions.disable.error.title';
            const descKey = isEnabled
                ? 'toastMessages.users.actions.enable.error.desc'
                : 'toastMessages.users.actions.disable.error.desc';

            console.error(error);
            toast({
                title: t(titleKey),
                description: t(descKey),
                variant: 'destructive',
            });
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async ({
            id,
            profilePic,
        }: {
            id: string;
            profilePic: File;
        }) => {
            const formData = new FormData();
            formData.append('profilePic', profilePic);
            return await usersApi.updateUserProfile(id, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: t('toastMessages.users.edit.success.title'),
                description: t('toastMessages.users.edit.success.desc'),
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
            toast({
                title: t('toastMessages.users.edit.error.title'),
                description: t('toastMessages.users.edit.error.desc'),
                variant: 'destructive',
            });
        },
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    const createUser = useMutation({
        mutationFn: async (data: CreateUserBodyType) => {
            return await usersApi.createUser(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: t('toastMessages.users.create.success.title'),
                description: t('toastMessages.users.create.success.desc'),
            });
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 409) {
                toast({
                    title: t(
                        'toastMessages.users.create.error.duplicate.title'
                    ),
                    description: t(
                        'toastMessages.users.create.error.duplicate.desc'
                    ),
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: t('toastMessages.users.create.error.title'),
                    description: t('toastMessages.users.create.error.desc'),
                    variant: 'destructive',
                });
            }
        },
    });

    return createUser;
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async (id: string) => {
            return await usersApi.deleteUser(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: t('toastMessages.users.delete.success.title'),
                description: t('toastMessages.users.delete.success.desc'),
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
            toast({
                title: t('toastMessages.users.delete.error.title'),
                description: t('toastMessages.users.delete.error.desc'),
                variant: 'destructive',
            });
        },
    });
};
