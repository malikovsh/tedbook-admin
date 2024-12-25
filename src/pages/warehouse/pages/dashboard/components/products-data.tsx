import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWarehouseDashboardQuery } from '@/hooks/useWarehouseDashboardQuery';
import {
  IconShoppingBagCheck,
  IconShoppingBagHeart,
  IconShoppingBagMinus,
} from '@tabler/icons-react';

export function ProductsData() {
  const { data } = useWarehouseDashboardQuery();

  if (!data?.data) {
    return;
  }

  return (
    <div>
      {data?.data.map((item, dataIndex) => (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          key={dataIndex}
        >
          <Card key={`${dataIndex}-most-used`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{`Eng ko'p sotilgan mahsulot`}</CardTitle>
              <IconShoppingBagCheck className="h-[2rem] w-[2rem] text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                Nomi: {item.mostUsedProduct?.details?.title}
              </div>
              <p className="text-xs text-muted-foreground">
                {'Soni'}: {item.mostUsedProduct?.count}
              </p>
            </CardContent>
          </Card>
          <Card key={`${dataIndex}-returned`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {`Omborga qaytarilgan mahsulotlar`}
              </CardTitle>
              <IconShoppingBagMinus className="h-[2rem] w-[2rem] text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-xl font-bold">
                {'Soni'}: {item.returnedCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Kuryer tomonidan muvofaqiyatli qaytarilgan
              </p>
            </CardContent>
          </Card>
          <Card key={`${dataIndex}-courier`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {`Kuryerdagi mahsulotlar`}
              </CardTitle>
              <IconShoppingBagHeart className="h-[2rem] w-[2rem] text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {'Soni'}: {item.pendingInCourierCount}
              </div>
              <p className="text-xs text-muted-foreground">Hozirda kuryerda</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
