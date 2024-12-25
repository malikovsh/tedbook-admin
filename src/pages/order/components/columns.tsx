import { Checkbox } from '@/components/ui/checkbox';
import { convertToReadableDate } from '@/lib/utils';
import { OrdersType } from '@/types/ordersType';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { statusMapping } from '../data/statusMapping';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

interface Product {
  _id: string;
  title: string;
}

export const columns: ColumnDef<OrdersType | any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="№" className="px-2" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-2 w-fit">
          <p className="font-medium">{row.getValue('orderCount')}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.status')}
        />
      );
    },
    cell: ({ row }) => {
      const { status } = row.original;
      const { label, color } = statusMapping[status] || {
        label: status,
        color: 'transparent',
      };

      return (
        <div
          style={{
            backgroundColor: color,
          }}
          className="p-[4px] text-black rounded-lg"
        >
          {label}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'operatorId',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.details.fields.createdBy')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.operatorId ? row.original.operatorId.name : 'N/A'}
        </div>
      );
    },
  },
  {
    accessorKey: 'logisticianId',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.details.fields.responsibleLogistician')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.logisticianId ? row.original.logisticianId.name : 'N/A'}
        </div>
      );
    },
  },

  {
    accessorKey: 'courierId',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.details.fields.responsibleCourier')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.courierId ? row.original.courierId.name : 'N/A'}
        </div>
      );
    },
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.fullName')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px]">
          <p className="">{row.getValue('fullName')}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.phoneNumber')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] flex-col">
          <p className="">{row.getValue('phoneNumber')}</p>
          <p className="">{row.original.phoneNumber2}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'productsIds',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.products')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] flex-col">
          {row.original.productsIds.map((item: Product) => {
            return (
              <div key={item._id} className="">
                {item.title}
              </div>
            );
          })}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'region',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.regions')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[220px]">
          <p className="">{row.getValue('region') || 'N/A'}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'district',
    header: ({ column }) => {
      // const { t } = useTranslation();
      return <DataTableColumnHeader column={column} title="Tumanlar" />;
    },
    cell: ({ row }) => {
      return (
        <div className="w-[220px]">
          <p className="">{row.getValue('district') || 'N/A'}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.address')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[180px]">
          <div className="text-wrap">{row.getValue('address') || 'N/A'}</div>
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
          title={t('pages.orders.table.columns.createdAt')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px]">
          <div className="">
            {convertToReadableDate(row.getValue('createdAt'))}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      const { t } = useTranslation();
      return (
        <DataTableColumnHeader
          column={column}
          title={t('pages.orders.table.columns.updatedAt')}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px]">
          <div className="">
            {convertToReadableDate(row.getValue('updatedAt'))}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
