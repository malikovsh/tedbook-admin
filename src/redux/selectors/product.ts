import { RootState } from '../store';

export const selectProduct = (state: RootState) => state.products;

export const selectProductData = (state: RootState) =>
  state.products.selectedProduct;
