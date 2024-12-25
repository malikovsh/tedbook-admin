import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

import { convertToReadableDate } from '@/lib/utils';
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
  // {
  //   accessorKey: '_id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='№' className='px-2' />
  //   ),
  //   cell: ({ row, table }) => {
  //     const total = table.getRowModel().rows.length
  //     const currentRow = total - row.index

  //     return (
  //       <div className='w-fit px-2'>
  //         <span className='font-medium'>{currentRow}</span>
  //       </div>
  //     )
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      const { t } = useTranslation();

      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.settings.products.table.columns.title')}
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
    accessorKey: 'price',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.settings.products.table.columns.price')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('price')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => {
      const { t } = useTranslation();

      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.settings.products.table.columns.comment')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('comment') || '-'}
          </span>
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
          title={t('pages.settings.products.table.columns.createdAt')}
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
