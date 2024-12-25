import {
  useQuery as useQueryDefault,
  useQueries as useQueriesDefault,
  useMutation as useMutationDefault,
  useInfiniteQuery as useInfiniteQueryDefault,
} from '@tanstack/react-query';

export const useQuery = useQueryDefault;
export const useInfiniteQuery = useInfiniteQueryDefault;
export const useQueries = useQueriesDefault;
export const useMutation = useMutationDefault;
