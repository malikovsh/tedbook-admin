import { Checkbox } from '@/components/ui/checkbox';
import { convertToReadableDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { useTranslation } from 'react-i18next';

export const columns: ColumnDef<any>[] = [
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
    accessorKey: 'region',
    header: ({ column }) => {
      // const { t } = useTranslation();
      return <DataTableColumnHeader column={column} title="Viloyatlar" />;
    },
    cell: ({ row }) => (
      <div className="w-[100%]">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue('region')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'district',
    header: ({ column }) => {
      // const { t } = useTranslation();
      return <DataTableColumnHeader column={column} title="Tumanlar" />;
    },
    cell: ({ row }) => (
      <div className="w-[100%]">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue('district')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      // const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title="Shaharlar yoki qishloqlar"
        />
      );
    },
    cell: ({ row }) => (
      <div className="w-[100%]">
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue('city')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.settings.location.table.columns.address')}
        />
      );
    },
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem]">
          {row.getValue('address')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.settings.location.table.columns.createdAt')}
        />
      );
    },
    cell: ({ row }) => (
      <div className="w-[150px]">
        <span>{convertToReadableDate(row.getValue('createdAt'))}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
