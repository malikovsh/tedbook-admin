import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/components/custom/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface DataTablePaginationProps {
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    total: number;
  };
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export function DataTablePagination({
  pagination: { pageIndex, pageSize, totalPages, total },
  setPage,
  setPageSize,
}: DataTablePaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="flex overflow-auto justify-between items-center px-2">
      <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
        {t('global.table.pagination.totalAccountant')}: {total}
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">
            {/* Har bir sahifadagi qatorlar */}
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={String(pageSize)} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Display information about the total number of pages or items */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t('global.table.pagination.page')} {pageIndex}{' '}
          {t('global.table.pagination.of')} {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden p-0 w-8 h-8 lg:flex"
            onClick={() => setPage(1)}
            disabled={pageIndex === 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="p-0 w-8 h-8"
            onClick={() => setPage(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="p-0 w-8 h-8"
            onClick={() => setPage(pageIndex + 1)}
            disabled={pageIndex >= totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden p-0 w-8 h-8 lg:flex"
            onClick={() => setPage(totalPages)}
            disabled={pageIndex >= totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
