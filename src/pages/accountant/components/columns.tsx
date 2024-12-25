import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Accountant } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<Accountant>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.accountant.table.columns.name')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[100px] ">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.accountant.table.columns.totalPrice')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('totalPrice')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.accountant.table.columns.quantity')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('quantity')}
          </span>
        </div>
      );
    },
  },
];
