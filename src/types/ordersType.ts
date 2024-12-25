import { ProductsType } from './productsType';

type OrderStatus =
  | 'Pending (In the logist)'
  | 'Pending (In the courier)'
  | 'Delivered'
  | 'Canceled'
  | string;

export interface OrdersType {
  _id: string;
  operatorId: {
    _id: string;
    name: string;
    username: string;
    shift: number | null;
  };
  courierId: {
    _id: string;
    name: string;
    username: string;
    shift: number | null;
  };
  logisticianId: {
    _id: string;
    name: string;
    username: string;
    shift: number | null;
  };
  fullName: string;
  phoneNumber: string;
  phoneNumber2: string;
  status: OrderStatus;
  productsIds: ProductsType[];
  region: string;
  district: string;
  city: string;
  address: string;
  is_archive: boolean;
  messages: CommentMessagesType[];
  payments: any[];
  createdAt: string;
  updatedAt: string;
  editHistory: {
    editorId: {
      _id: string;
      name: string;
      username: string;
    };
    editTime: string;
    editDuration: number;
    _id: string;
  }[];
}

export interface CreateOrdersBodyType {
  operatorId: string;
  fullName: string;
  phoneNumber: string;
  phoneNumber2: string | null;
  productsIds: string[];
  region: string | null;
  district: String[] | null;
  city: String[] | null;
  logisticianId: string;
  address: string | null;
  messages: {
    commenterRole: string;
    commentText: string;
  }[];
}

export type GetAllOrdersResponseType = {
  data: {
    total: number;
    page: number;
    totalPages: number;
    orders: OrdersType[];
  };
  message: string;
};

export type CommentMessagesType = {
  commenterRole: string;
  commentText: string;
  _id: string;
  createdAt: string;
};
