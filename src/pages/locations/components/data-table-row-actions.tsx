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
// import { useAppDispatch } from '@/redux/store'
// import { useNavigate } from 'react-router-dom'
// import { useDeleteShifts } from '@/hooks/useShiftsQuery'
// import { selectShiftAction } from '@/redux/reducers/shifts'

type DataTableRowActionsProps = {
  row: any;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  // const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  // const { mutate } = useDeleteShifts()

  // const onEdit = () => {
  //   dispatch(selectShiftAction(row))
  //   navigate(`/shift/${row._id}/edit`)
  // }

  // const onDelete = () => {
  //   mutate(row._id)
  // }

  // onClick={onEdit}

  //onClick={onDelete}

  console.log(row);

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
        <DropdownMenuItem>
          Tahrirlash
          <DropdownMenuShortcut>
            <Pencil2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          O'chirish
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
