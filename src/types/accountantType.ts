import { Accountant } from '@/pages/accountant/data/schema';

export type GetAllAccountantData = {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  data: Accountant[];
};

export type GetAccountantProductsResponseType = {
  data: Accountant[];
};
