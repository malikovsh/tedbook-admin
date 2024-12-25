import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder={`${t('global.table.search.title')} (Mahsulot nomi bo'yicha)`}
          value={
            (table.getColumn('productName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('productName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <DataTableFacetedFilter
          column={table.getColumn('changeType')}
          title={t("Turi bo'yicha")}
          options={[
            { label: t("Qo'shildi"), value: 'add' },
            { label: t('Olib tashlangan'), value: 'remove' },
          ]}
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
