import { Checkbox } from '@/components/ui/checkbox';
import { ProductDetail } from '@/types/warehouseReturnType';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { DataTableColumnHeader } from './data-table-column-header';

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
    accessorKey: 'courierName',
    header: ({ column }) => {
      const { t } = useTranslation();
      return <DataTableColumnHeader column={column} title={t('Kuryer')} />;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[100%] ">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue('courierName')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      const { t } = useTranslation();

      return (
        <DataTableColumnHeader column={column} title={t('Mahsulot nomi')} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] flex-col">
          {row.original.products.map((item: ProductDetail, index: any) => {
            return <span key={index}>{item.title}</span>;
          })}
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
        <div className="flex w-[100px] flex-col">
          {row.original.products.map((item: ProductDetail, index: any) => {
            return <span key={index}>{item.quantity}</span>;
          })}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
