import { ProductsType } from '@/types/productsType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProductState = {
  products: {
    data: ProductsType[];
    status: 'loading' | 'idle' | 'failed' | 'success';
  };
  selectedProduct: ProductsType | null;
};

const defaultState: ProductState = {
  products: {
    data: [],
    status: 'idle',
  },
  selectedProduct: null,
};

const slice = createSlice({
  name: 'products',
  initialState: defaultState,
  reducers: {
    selectProductAction: (state, action: PayloadAction<ProductsType>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProductAction: (state) => {
      state.selectedProduct = null;
    },
  },
});

const { actions, reducer } = slice;
export const { selectProductAction, clearSelectedProductAction } = actions;
export default reducer;
