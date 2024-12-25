import { RootState } from '../store';

export const selectWarehouse = (state: RootState) => state.warehouse;

export const selectWarehouseData = (state: RootState) =>
  state.warehouse.selectedWarehouse;
