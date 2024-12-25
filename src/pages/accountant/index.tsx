import { useAccountantQuery } from '@/hooks/useAccountantQuery';
import { selectUser } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useTranslation } from 'react-i18next';

export default function Accountant() {
  const user = useAppSelector(selectUser);
  const { resData, pagination, setPage, setPageSize } = useAccountantQuery(
    user.id,
    user.role,
  );

  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('pages.accountant.title')}
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
