export const LOGIN = '/auth/login';

export const HOME = '/';
export const DASHBOARD = 'dashboard';

export const USERS = 'users';
export const CREATE_USER = 'createUser';
export const EDIT_USER = ':userId/edit';

export const PRODUCT = 'products';
export const CREATE_PRODUCT = 'create';
export const EDIT_PRODUCT = ':productId/edit';

export const ORDERS = 'orders';
export const CREATE_ORDER = 'createOrder';
export const ORDER_DETAILS = ':ordersId/details';
export const EDIT_ORDER = ':ordersId/edit';
export const UPDATE_ORDER = ':ordersId/update';

export const LOCATIONS = 'locations';

export const ACCOUNTANT = 'accountant';

export const WAREHOUSE = 'warehouse';
export const CREATE_WAREHOUSE = 'warehouse';
export const EDIT_WAREHOUSE = ':warehouseId/edit';

export const WAREHOUSE_DASHBOARD = 'warehouse-dashboard';
export const WAREHOUSE_HISTORY = 'warehouse-history';
export const WAREHOUSE_RETURN = 'warehouse-returning';

export const PROFILE = 'profile';

const paths = {
  auth: {
    LOGIN,
  },
  home: {
    HOME,
    DASHBOARD,
  },
  users: {
    USERS,
    CREATE_USER,
    EDIT_USER,
  },
  product: {
    PRODUCT,
    CREATE_PRODUCT,
    EDIT_PRODUCT,
  },
  orders: {
    ORDERS,
    CREATE_ORDER,
    ORDER_DETAILS,
    EDIT_ORDER,
    UPDATE_ORDER,
  },
  locations: {
    LOCATIONS,
  },
  accountant: {
    ACCOUNTANT,
  },
  warehouse: {
    WAREHOUSE,
    CREATE_WAREHOUSE,
    EDIT_WAREHOUSE,
  },
  warehouseDashboard: {
    WAREHOUSE_DASHBOARD,
  },
  warehouseHistory: {
    WAREHOUSE_HISTORY,
  },
  warehouseReturn: {
    WAREHOUSE_RETURN,
  },
  profile: {
    PROFILE,
  },
};

export default paths;
