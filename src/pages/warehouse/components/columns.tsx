import { Checkbox } from '@/components/ui/checkbox';
import { convertToReadableDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

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
    accessorFn: (row) => row.productId?.title ?? '',
    header: ({ column }) => {
      const { t } = useTranslation();

      return <DataTableColumnHeader column={column} title={t('Nomi')} />;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original?.productId?.title}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      const { t } = useTranslation();

      return <DataTableColumnHeader column={column} title={t('Soni')} />;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px]">
          <span className="">{row.getValue('quantity')}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t('Yaratilgan sana')} />
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt');
      return (
        <div className="w-[150px]">
          <span className="">{convertToReadableDate(createdAt as string)}</span>
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
