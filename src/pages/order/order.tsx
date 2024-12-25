import { useOrderQuery } from '@/hooks/useOrderQuery';
import { selectUser } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

const OrderList = () => {
  const user = useAppSelector(selectUser);
  const {
    isLoading,
    filteredData,
    pagination,
    setPage,
    setPageSize,
    setFilters,
  } = useOrderQuery(user?.id);
  const { t } = useTranslation();

  return (
    <main>
      <div className="mb-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('pages.orders.title')}
          </h2>
        </div>
      </div>
      <div className="flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          data={filteredData}
          columns={columns}
          isLoading={isLoading}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setPageSize}
          setFilters={setFilters}
        />
      </div>
    </main>
  );
};

export default OrderList;
