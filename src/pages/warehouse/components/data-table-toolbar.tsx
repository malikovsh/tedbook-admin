import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import paths from '@/router/paths';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const navigate = useNavigate();
  const handleCreateProduct = () => {
    navigate(paths.warehouse.CREATE_WAREHOUSE);
  };

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder={`${t('global.table.search.title')} (Mahsulot nomi bo'yicha)`}
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Tozalash
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button onClick={handleCreateProduct}>
        {t('pages.settings.products.buttons.add')}{' '}
        <IconSquareRoundedPlus className="ms-2" size={18} />
      </Button>
    </div>
  );
}
