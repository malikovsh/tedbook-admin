import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersType } from '@/types/ordersType';

export type OrderDetailState = {
  orderDetails: {
    data: OrdersType[];
    status: 'loading' | 'idle' | 'failed' | 'success';
  };
  selectedOrderDetails: OrdersType | null;
};

const defaultState: OrderDetailState = {
  orderDetails: {
    data: [],
    status: 'idle',
  },
  selectedOrderDetails: null,
};

const slice = createSlice({
  name: 'orderDetails',
  initialState: defaultState,
  reducers: {
    selectOrderDetailAction: (state, action: PayloadAction<OrdersType>) => {
      state.selectedOrderDetails = action.payload;
    },
    clearSelectedOrderDerailsAction: (state) => {
      state.selectedOrderDetails = null;
    },
  },
});

const { actions, reducer } = slice;
export const { selectOrderDetailAction, clearSelectedOrderDerailsAction } =
  actions;
export default reducer;
