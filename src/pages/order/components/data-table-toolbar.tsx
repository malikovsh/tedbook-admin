import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/constants/enum';
import { selectRegionOptions } from '@/constants/regions';
import useOrderAccessRole from '@/hooks/useOrderAccessRole';
import { useProductQuery } from '@/hooks/useProductQuery';
import {
  useCourierOptions,
  useLogisticianOptions,
  useOperatorOptions,
} from '@/hooks/useUsersQuery';
import { userRole } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import districts from '@/api/districts.json';

const statusOptions = [
  { label: 'Kutilmoqda (logistda)', value: 'Pending (In the logist)' },
  { label: 'Kutilmoqda (kuryerda)', value: 'Pending (In the courier)' },
  { label: 'Omborga qaytarilmoqda', value: 'Returning' },
  { label: 'Omborga qaytarilgan', value: 'Returned' },
  { label: 'Yetkazib berilgan', value: 'Delivered' },
  { label: 'Bekor qilingan', value: 'Canceled' },
];

const shiftOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const selectDistrictOptions = districts.map((district) => ({
  label: district.name_uz,
  value: district.name_uz,
}));

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setFilters: (filters: Record<string, any>) => void;
}

export function DataTableToolbar<TData>({
  table,
  setFilters,
}: DataTableToolbarProps<TData>) {
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [productFilter, setProductFilter] = useState<string | null>(null);
  const [operatorFilter, setOperatorFilter] = useState<string | null>(null);
  const [courierFilter, setCourierFilter] = useState<string | null>(null);
  const [logisticFilter, setLogisticFilter] = useState<string | null>(null);
  const [shiftFilter, setShiftFilter] = useState<string | null>(null);

  const { options: productOptions } = useProductQuery();
  const { options: operators } = useOperatorOptions();
  const { options: couriers } = useCourierOptions();
  const { options: logisticians } = useLogisticianOptions();

  const { isAdmin } = useOrderAccessRole();

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    regionFilter !== null ||
    statusFilter !== null ||
    productFilter !== null ||
    operatorFilter !== null ||
    courierFilter !== null ||
    logisticFilter !== null ||
    shiftFilter !== null;

  const navigate = useNavigate();
  const role: any = useAppSelector(userRole);
  const { t } = useTranslation();

  const handleCreateProduct = () => {
    navigate('/orders/createOrder');
  };

  useEffect(() => {
    const filters: { [key: string]: string } = {};

    if (regionFilter) filters.region = regionFilter;
    if (districtFilter) filters.district = districtFilter;
    if (statusFilter) filters.status = statusFilter;
    if (productFilter) filters.productsIds = productFilter;
    if (operatorFilter) filters.operatorId = operatorFilter;
    if (courierFilter) filters.courierId = courierFilter;
    if (logisticFilter) filters.logisticianId = logisticFilter;
    if (shiftFilter) filters.operatorShift = shiftFilter;

    setFilters(filters);
  }, [
    regionFilter,
    districtFilter,
    statusFilter,
    productFilter,
    operatorFilter,
    courierFilter,
    logisticFilter,
    shiftFilter,
  ]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col-reverse items-start flex-1 overflow-x-scroll gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder={
            t('global.table.search.title') +
            ' ' +
            t('pages.orders.search.placeholder')
          }
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <DataTableFacetedFilter
          title={t('pages.orders.create.fields.regions')}
          options={selectRegionOptions}
          selectedValue={regionFilter}
          setSelectedValue={setRegionFilter}
        />

        <DataTableFacetedFilter
          title="Tumanlar"
          options={selectDistrictOptions}
          selectedValue={districtFilter}
          setSelectedValue={setDistrictFilter}
        />

        <DataTableFacetedFilter
          title={t('pages.orders.table.columns.status')}
          options={statusOptions}
          selectedValue={statusFilter}
          setSelectedValue={setStatusFilter}
        />

        <DataTableFacetedFilter
          title={t('pages.orders.table.columns.products')}
          options={productOptions}
          selectedValue={productFilter}
          setSelectedValue={setProductFilter}
        />

        {isAdmin && (
          <>
            <DataTableFacetedFilter
              title={t('pages.orders.table.columns.operators')}
              options={operators || []}
              selectedValue={operatorFilter}
              setSelectedValue={setOperatorFilter}
            />

            <DataTableFacetedFilter
              title={t('pages.orders.table.columns.couriers')}
              options={couriers || []}
              selectedValue={courierFilter}
              setSelectedValue={setCourierFilter}
            />

            <DataTableFacetedFilter
              title={t('pages.orders.table.columns.logisticians')}
              options={logisticians || []}
              selectedValue={logisticFilter}
              setSelectedValue={setLogisticFilter}
            />

            <DataTableFacetedFilter
              title={t('pages.orders.table.columns.shifts')}
              options={shiftOptions || []}
              selectedValue={shiftFilter}
              setSelectedValue={setShiftFilter}
            />
          </>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setRegionFilter(null);
              setStatusFilter(null);
              setProductFilter(null);
              setOperatorFilter(null);
              setCourierFilter(null);
              setLogisticFilter(null);
              setShiftFilter(null);
              setDistrictFilter(null);
            }}
            className="h-8 px-2 lg:px-3"
          >
            {t('global.table.toolbar.clear')}
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      {UserRole.operator === role && (
        <Button onClick={handleCreateProduct}>
          {t('pages.orders.create.title')}{' '}
          <IconSquareRoundedPlus className="ms-2" size={18} />
        </Button>
      )}
    </div>
  );
}
