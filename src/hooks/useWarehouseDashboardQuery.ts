import { useQuery } from './useQuery';
import warehouseDashboardApi from '@/api/requests/warehouseDashboardApi';

export const useWarehouseDashboardQuery = () => {
  return useQuery({
    queryKey: ['warehouseDashboard'],
    queryFn: async () => {
      return await warehouseDashboardApi.getDashboardData();
    },
  });
};
