import { Layout } from '@/components/custom/layout';
import { useTranslation } from 'react-i18next';
import { Overview } from './components/overview';
import { ProductsData } from './components/products-data';

export default function WarehouseDashboard() {
  const { t } = useTranslation();

  return (
    <Layout.Body>
      <div className="flex items-center justify-between mb-[1.5rem] space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('Dashboard')}
        </h1>
      </div>
      <ProductsData />
      <Overview />
    </Layout.Body>
  );
}
