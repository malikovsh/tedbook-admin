import {
  DotsHorizontalIcon,
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
import { useDeleteWarehouse } from '@/hooks/useWarehouseQuery';
import { selectWarehouseAction } from '@/redux/reducers/warehouse';
import { useAppDispatch } from '@/redux/store';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type DataTableRowActionsProps = {
  row: any;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useDeleteWarehouse();

  const onEdit = () => {
    dispatch(selectWarehouseAction(row));
    navigate(`/warehouse/${row._id}/edit`);
  };

  const onDelete = () => {
    mutate(row._id);
  };

  const { t } = useTranslation();

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
        <DropdownMenuItem onClick={onEdit}>
          {t("O'zgartirish")}
          <DropdownMenuShortcut>
            <Pencil2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          {t("O'chirish")}
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
