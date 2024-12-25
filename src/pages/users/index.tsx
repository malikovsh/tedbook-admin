import { useGetAllUsers } from '@/hooks/useUsersQuery';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useTranslation } from 'react-i18next';

export default function Users() {
    const { isLoading, resData, pagination, setPage, setPageSize, setSearch } =
        useGetAllUsers();
    const { t } = useTranslation();

    return (
        <div>
            <div className="mb-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {t('pages.users.title')}
                </h2>
            </div>
            <div className="overflow-auto flex-1 px-4 py-1 -mx-4 lg:flex-row lg:space-x-12 lg:space-y-0">
                <DataTable
                    data={resData}
                    columns={columns}
                    isLoading={isLoading}
                    pagination={pagination}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    setSearch={setSearch}
                />
            </div>
        </div>
    );
}
