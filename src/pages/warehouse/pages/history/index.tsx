import { useWarehouseHistoryQuery } from '@/hooks/useWarehouseHistoryQuery';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default function WarehouseHistory() {
  const { resData, setPage, pagination, setPageSize } =
    useWarehouseHistoryQuery();

  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('Tarix')}
          </h2>
        </div>
      </div>
      <div className="overflow-auto flex-1 px-4 py-1 -mx-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          data={resData || []}
          columns={columns}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
