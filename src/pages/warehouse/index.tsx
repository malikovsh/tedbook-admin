import { useWarehouseQuery } from '@/hooks/useWarehouseQuery';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default function Warehouse() {
  const { resData, isLoading, pagination, setPage, setPageSize } =
    useWarehouseQuery();

  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('Mahsulotlar ombori')}
          </h2>
        </div>
      </div>
      <div className="overflow-auto flex-1 px-4 py-1 -mx-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          data={resData}
          columns={columns}
          isLoading={isLoading}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
