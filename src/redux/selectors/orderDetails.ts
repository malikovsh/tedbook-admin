import { RootState } from '../store';

export const selectOrderDetails = (state: RootState) => state.orderDetails;

export const selectOrderDetailsData = (state: RootState) =>
  state.orderDetails.selectedOrderDetails;
