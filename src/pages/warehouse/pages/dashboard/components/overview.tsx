import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import Empty from '@/components/empty';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useWarehouseDashboardQuery } from '@/hooks/useWarehouseDashboardQuery';
import { useTranslation } from 'react-i18next';

export const description = 'Individual donut charts for each product';

export function Overview() {
  const { data } = useWarehouseDashboardQuery();

  const productNamesWithQuantities = React.useMemo(() => {
    return data?.data?.[0]?.productNamesWithQuantities || [];
  }, [data]);

  const getColor = (index: number) => {
    const colors = ['cornflowerblue', 'salmon', 'gold', 'limegreen', 'purple'];
    return colors[index % colors.length];
  };

  const { t } = useTranslation();

  if (!data?.data) {
    return <Empty />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-4 lg:flex-row">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('Ombordagi bor mahsulotlar')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {productNamesWithQuantities.map(
                  (product: any, index: number) => (
                    <Card key={product.name} className="flex flex-col">
                      <CardHeader className="items-center pb-0">
                        <h2 className="text-lg font-semibold">
                          {product.name}
                        </h2>
                      </CardHeader>
                      <CardContent className="flex-1 pb-0">
                        <ChartContainer
                          config={{
                            label: product.name,
                          }}
                          className="mx-auto aspect-square max-h-[250px]"
                        >
                          <PieChart>
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                              data={[
                                {
                                  name: product.name,
                                  quantity: product.quantity,
                                },
                              ]}
                              dataKey="quantity"
                              nameKey="name"
                              innerRadius={60}
                              outerRadius={80}
                              fill={getColor(index)}
                              strokeWidth={5}
                            >
                              <Label
                                content={({ viewBox }) => {
                                  if (
                                    viewBox &&
                                    'cx' in viewBox &&
                                    'cy' in viewBox
                                  ) {
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
                                          {product.quantity.toLocaleString()}
                                        </tspan>
                                      </text>
                                    );
                                  }
                                }}
                              />
                            </Pie>
                          </PieChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
