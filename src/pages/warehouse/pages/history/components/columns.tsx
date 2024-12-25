import { Checkbox } from '@/components/ui/checkbox';
import { convertToReadableDate } from '@/lib/utils';
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
    id: 'productName',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader column={column} title={t('Mahsulot nomi')} />
      );
    },
    accessorFn: (row) => row.productId?.title ?? 'N/A',
    cell: ({ row }) => {
      return (
        <div className="w-[100%]">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.productId?.title}
          </span>
        </div>
      );
    },
    filterFn: (row, filterValue) => {
      const title = row.original.productId?.title || '';
      return title.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: 'changeType',
    header: ({ column }) => {
      const { t } = useTranslation();
      return <DataTableColumnHeader column={column} title={t('Turi')} />;
    },
    cell: ({ row }) => {
      const { t } = useTranslation();
      const changeType = row.getValue('changeType');

      const translatedChangeType: any =
        changeType === 'add'
          ? t("Qo'shildi")
          : changeType === 'remove'
            ? t('Olib tashlangan')
            : changeType === 'update'
              ? t('Yangilandi')
              : changeType;

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem]">
            {translatedChangeType}
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
    enableSorting: false,
    enableHiding: false,
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
];
