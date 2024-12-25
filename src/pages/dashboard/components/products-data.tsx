import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardQuery } from '@/hooks/useDashboardQuery';
import { selectUser } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { useTranslation } from 'react-i18next';
import useOrderAccessRole from '@/hooks/useOrderAccessRole';

interface Props {
  time: string;
  date: {
    startDate?: Date;
    endDate?: Date;
  };
}

export function ProductsData({ time, date }: Props) {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const { data, isLoading = false } = useDashboardQuery({
    timeRange: time,
    userId: user.id,
    userRole: user.role,
    startDateString: date.startDate,
    endDateString: date.endDate,
  });

  const { isAdmin } = useOrderAccessRole();

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Most Active User */}
      {data?.data?.mostActiveUser && isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium tracking-tight">
              {t('pages.dashboard.most.activeUser')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {data?.data?.mostActiveUser?.userName}
            </div>
            <p className="text-sm">
              {t('pages.dashboard.ordersCount')}:{' '}
              {data?.data?.mostActiveUser?.count}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Most Active Region */}
      {data?.data?.mostActiveRegion && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium tracking-tight">
              {t('pages.dashboard.most.activeRegion')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {data?.data?.mostActiveRegion?.region}
            </div>
            <p className="text-sm">
              {t('pages.dashboard.ordersCount')}:{' '}
              {data?.data?.mostActiveRegion?.count}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Best Selling Product */}
      {data?.data?.bestSellingProduct && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium tracking-tight">
              {t('pages.dashboard.most.activeProduct')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {data?.data?.bestSellingProduct?.productName}
            </div>
            <p className="text-sm">
              {t('pages.dashboard.numberOfSales')}:{' '}
              {data?.data?.bestSellingProduct?.count}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
