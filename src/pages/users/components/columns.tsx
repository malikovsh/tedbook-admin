import { Checkbox } from '@/components/ui/checkbox';
import { convertToReadableDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { User } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.users.columns.name')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-[180px] items-center">
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.users.columns.username')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('username')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.users.columns.role')}
        />
      );
    },
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('role')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'isBoss',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.users.columns.isBoss')}
        />
      );
    },
    cell: ({ row }) => {
      const { t } = useTranslation();
      return (
        <div className="w-[80px]">
          {row.getValue('isBoss')
            ? t('pages.users.columns.yes')
            : t('pages.users.columns.no')}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'shift',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.users.columns.shift')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">
          {row.getValue('shift') === 0 ? '' : row.getValue('shift')}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.users.columns.createdAt')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px]">
          <span className="">
            {convertToReadableDate(row.getValue('createdAt'))}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
  },
];
