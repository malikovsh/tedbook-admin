import { WarehouseType } from '@/types/warehuseType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WarehouseState = {
  warehouse: {
    data: WarehouseType[];
    status: 'loading' | 'idle' | 'failed' | 'success';
  };
  selectedWarehouse: WarehouseType | null;
};

const defaultState: WarehouseState = {
  warehouse: {
    data: [],
    status: 'idle',
  },
  selectedWarehouse: null,
};

const slice = createSlice({
  name: 'warehouse',
  initialState: defaultState,
  reducers: {
    selectWarehouseAction: (state, action: PayloadAction<WarehouseType>) => {
      state.selectedWarehouse = action.payload;
    },
    clearSelectedWarehouseAction: (state) => {
      state.selectedWarehouse = null;
    },
  },
});

const { actions, reducer } = slice;
export const { selectWarehouseAction, clearSelectedWarehouseAction } = actions;
export default reducer;
