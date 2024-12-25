import { Accountant } from '@/pages/accountant/data/schema';

export type GetAllDashboardResponseType = {
  message: string;
  data: any;
};

export type GetAccountantProductsResponseType = {
  data: Accountant[];
};
