import dashboardApi from '@/api/requests/dashboardApi';
import { useMemo } from 'react';
import { useQuery } from './useQuery';

export const useDashboardQuery = (params: {
  timeRange: string;
  userId: string;
  userRole: string;
  startDateString?: Date;
  endDateString?: Date;
}) => {
  const newParams = useMemo(() => {
    if (params.timeRange === 'month') {
      return params;
    }
    delete params.endDateString;
    delete params.startDateString;
    return params;
  }, [params]);

  return useQuery({
    queryKey: ['dashboardData', newParams],
    queryFn: async () => {
      return await dashboardApi.getDashboardData(newParams);
    },
  });
};
