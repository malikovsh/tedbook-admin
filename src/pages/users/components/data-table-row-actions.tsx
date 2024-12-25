import {
  CheckIcon,
  Cross2Icon,
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
import { useAppDispatch } from '@/redux/store';
import { selectUserAction } from '@/redux/reducers/users';
import { useNavigate } from 'react-router-dom';
import { useDeleteUser, useDisableUser } from '@/hooks/useUsersQuery';
import { useTranslation } from 'react-i18next';

type DataTableRowActionsProps = {
  row: any;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useDeleteUser();
  const { mutate: disableUser } = useDisableUser();

  const onEdit = () => {
    dispatch(selectUserAction(row));
    navigate(`/users/${row._id}/edit`);
  };

  const onDelete = () => {
    mutate(row._id);
  };

  const onDisable = () => {
    const formData = new FormData();
    formData.append('isActive', !row.isActive ? 'true' : 'false');
    disableUser({ id: row._id, body: formData });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={onDisable}>
          {row?.isActive
            ? t('global.table.buttons.disable')
            : t('global.table.buttons.enable')}
          <DropdownMenuShortcut>
            {row?.isActive ? <Cross2Icon /> : <CheckIcon />}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          {t('pages.orders.table.rowActions.edit')}
          <DropdownMenuShortcut>
            <Pencil2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          {t('pages.orders.table.rowActions.delete')}
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
