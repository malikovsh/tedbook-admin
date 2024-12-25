import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useLocationsQuery } from '@/hooks/useLocationsQuery';
import { useTranslation } from 'react-i18next';

export default function Shift() {
  const { resData, pagination, setPage, setPageSize } = useLocationsQuery();

  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('pages.settings.location.title')}
          </h2>
        </div>
      </div>
      <div className="overflow-auto flex-1 px-4 py-1 -mx-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          data={resData}
          columns={columns}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
