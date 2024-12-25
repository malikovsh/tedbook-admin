import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useDashboardQuery } from '@/hooks/useDashboardQuery';
import { selectUser } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { useTranslation } from 'react-i18next';

import { statusMapping } from '@/pages/order/data/statusMapping';

export const description = 'A donut chart with text';

const chartColors = ['cornflowerblue', 'orange', 'red', 'green'];

const chartConfig = Object.keys(statusMapping).reduce((acc: any, key) => {
  acc[key] = {
    label: statusMapping[key].label,
    color: statusMapping[key].color,
  };
  return acc;
}, {});

interface Props {
  time: string;
  date: {
    startDate?: Date;
    endDate?: Date;
  };
}

export function Overview({ time, date }: Props) {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  const { data } = useDashboardQuery({
    timeRange: time,
    userId: user.id,
    userRole: user.role,
    startDateString: date.startDate,
    endDateString: date.endDate,
  });

  const toArrayChart = (ordersData: any) => {
    if (!ordersData) return [];

    const statusCounts: Record<string, number> = {};

    ordersData.forEach((order: any) => {
      const mappedStatus = statusMapping[order.status]?.label || order.status;
      statusCounts[mappedStatus] =
        (statusCounts[mappedStatus] || 0) + order.orderCount;
    });

    return Object.entries(statusCounts).map(([status, count], index) => {
      const color = statusMapping[status]?.color || chartColors[index];
      return { status, count, fill: color };
    });
  };

  const totalOrders = React.useMemo(() => {
    const ordersArray = toArrayChart(data?.data?.orders || []);

    return ordersArray.reduce((acc: any, curr: any) => acc + curr.count, 0);
  }, [data?.data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0"></CardHeader>
      <CardContent className="flex-1 pb-0">
        {data?.data?.orders.length ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={toArrayChart(data?.data?.orders)}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-3xl font-bold fill-foreground"
                          >
                            {totalOrders.toLocaleString()}{' '}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="mx-auto flex aspect-square max-h-[250px] items-center justify-center">
            <p className="text-center text-1xl">
              {t('pages.dashboard.noOrders')}
            </p>{' '}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
