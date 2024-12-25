import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    setSearch?: (search: string) => void;
}

export function DataTableToolbar<TData>({
    table,
    setSearch,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const navigate = useNavigate();
    const handleCreateUser = () => {
        navigate('/users/createUser');
    };

    const handleSearchChange = useCallback(
        debounce((event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setSearch?.(value);
        }, 500),
        []
    );

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder={
                        t('global.table.search.title') +
                        ' (' +
                        "Ism bo'yicha" +
                        ')'
                    }
                    onChange={handleSearchChange}
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                {/* Role Filter */}
                <DataTableFacetedFilter
                    column={table.getColumn('role')}
                    title={t('Rol')}
                    options={[
                        { label: t('Admin'), value: 'admin' },
                        { label: t('Operator'), value: 'operator' },
                        { label: t('Logist'), value: 'logistician' },
                        { label: t('Kuryer'), value: 'courier' },
                        {
                            label: t('Hisobchi - bugalter'),
                            value: 'accountant',
                        },
                        { label: t('Ombor nazoratchisi'), value: 'warehouse' },
                    ]}
                />

                {/* Reset Button */}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        // onClick={handleResetFilters}
                        className="h-8 px-2 lg:px-3"
                    >
                        {t('Tozalash')}
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <Button onClick={handleCreateUser}>
                {t('pages.users.create.title')}{' '}
                <IconSquareRoundedPlus className="ms-2" size={18} />
            </Button>
        </div>
    );
}
