import {
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useOrderAccessRole from '@/hooks/useOrderAccessRole';
import { selectOrderDetailAction } from '@/redux/reducers/orderDetail';
import { useAppDispatch } from '@/redux/store';
import { OrdersType } from '@/types/ordersType';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type DataTableRowActionsProps = {
  row: any;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isLogistician, isAdmin } = useOrderAccessRole();

  const handleEdit = () => {
    dispatch(selectOrderDetailAction(row.original as any));
    navigate(`/orders/${row.original._id}/update`);
  };

  const handleDetails = (data: OrdersType) => {
    dispatch(selectOrderDetailAction(data));
    navigate(`/orders/${data._id}/details`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleDetails(row.original as any)}>
          {t('pages.orders.table.rowActions.see')}
          <DropdownMenuShortcut>
            <EyeOpenIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {isLogistician && (
          <DropdownMenuItem onClick={handleEdit}>
            {t('pages.orders.table.rowActions.edit')}
            <DropdownMenuShortcut>
              <Pencil2Icon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        {/*
        <DropdownMenuItem onClick={handleEdit}>
          {t('pages.orders.table.rowActions.cancel')}
          <DropdownMenuShortcut>
            <Cross2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}

        {isAdmin && (
          <DropdownMenuItem>
            {t('pages.orders.table.rowActions.delete')}
            <DropdownMenuShortcut>
              <TrashIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
