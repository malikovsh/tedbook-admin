import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import GeneralError from '../pages/errors/general-error.tsx';
import MaintenanceError from '../pages/errors/maintenance-error.tsx';
import NotFoundError from '../pages/errors/not-found-error.tsx';
import UnauthorisedError from '../pages/errors/unauthorised-error.tsx';
import paths from './paths.ts';

const router = createBrowserRouter(
  [
    // Auth routes
    {
      path: paths.auth.LOGIN,
      lazy: async () => ({
        Component: (await import('../pages/auth/sign-in.tsx')).default,
      }),
    },

    // Main routes
    {
      path: paths.home.HOME,
      lazy: async () => {
        const AppShell = await import('../components/app-shell.tsx');
        return { Component: AppShell.default };
      },
      children: [
        {
          path: '',
          index: true,
          lazy: async () => ({
            Component: () => <Navigate to={paths.home.DASHBOARD} />,
          }),
        },
        {
          path: paths.home.DASHBOARD,
          lazy: async () => ({
            Component: (await import('@/pages/dashboard')).default,
          }),
        },
        {
          path: paths.users.USERS,
          lazy: async () => ({
            Component: () => <Outlet />,
          }),
          children: [
            {
              path: '',
              index: true,
              lazy: async () => ({
                Component: (await import('@/pages/users')).default,
              }),
            },
            {
              path: paths.users.CREATE_USER,
              lazy: async () => ({
                Component: (await import('@/pages/users/create-user')).default,
              }),
            },
            {
              path: paths.users.EDIT_USER,
              lazy: async () => ({
                Component: (await import('@/pages/users/edit-user')).default,
              }),
            },
          ],
        },
        {
          path: paths.product.PRODUCT,
          lazy: async () => ({
            Component: () => <Outlet />,
          }),
          children: [
            {
              index: true,
              path: '',
              lazy: async () => ({
                Component: (await import('@/pages/product')).default,
              }),
            },
            {
              path: paths.product.CREATE_PRODUCT,
              lazy: async () => ({
                Component: (await import('@/pages/product/create-product'))
                  .default,
              }),
            },
            {
              path: paths.product.EDIT_PRODUCT,
              lazy: async () => ({
                Component: (await import('@/pages/product/edit-product'))
                  .default,
              }),
            },
          ],
        },
        {
          path: paths.orders.ORDERS,
          lazy: async () => ({
            Component: () => <Outlet />,
          }),
          children: [
            {
              path: '',
              index: true,
              lazy: async () => ({
                Component: (await import('@/pages/order')).default,
              }),
            },
            {
              path: paths.orders.CREATE_ORDER,
              lazy: async () => ({
                Component: (await import('@/pages/order/create-order')).default,
              }),
            },
            {
              path: paths.orders.ORDER_DETAILS,
              lazy: async () => ({
                Component: (await import('@/pages/order/order-detail')).default,
              }),
            },
            {
              path: paths.orders.EDIT_ORDER,
              lazy: async () => ({
                Component: (await import('@/pages/order/edit-order')).default,
              }),
            },
            {
              path: paths.orders.UPDATE_ORDER,
              lazy: async () => ({
                Component: (await import('@/pages/order/edit-order')).default,
              }),
            },
          ],
        },
        {
          path: paths.locations.LOCATIONS,
          lazy: async () => ({
            Component: (await import('@/pages/locations')).default,
          }),
        },
        {
          path: paths.accountant.ACCOUNTANT,
          lazy: async () => ({
            Component: (await import('@/pages/accountant')).default,
          }),
        },
        {
          path: paths.warehouse.WAREHOUSE,
          lazy: async () => ({
            Component: () => <Outlet />,
          }),
          children: [
            {
              path: '',
              index: true,
              lazy: async () => ({
                Component: (await import('@/pages/warehouse')).default,
              }),
            },
            {
              path: paths.warehouse.CREATE_WAREHOUSE,
              lazy: async () => ({
                Component: (
                  await import('@/pages/warehouse/create-warehouse.tsx')
                ).default,
              }),
            },
            {
              path: paths.warehouse.EDIT_WAREHOUSE,
              lazy: async () => ({
                Component: (
                  await import('@/pages/warehouse/edit-warehouse.tsx')
                ).default,
              }),
            },
          ],
        },
        {
          path: paths.warehouseDashboard.WAREHOUSE_DASHBOARD,
          lazy: async () => ({
            Component: (
              await import('@/pages/warehouse/pages/dashboard/index.tsx')
            ).default,
          }),
        },
        {
          path: paths.warehouseHistory.WAREHOUSE_HISTORY,
          lazy: async () => ({
            Component: (
              await import('@/pages/warehouse/pages/history/index.tsx')
            ).default,
          }),
        },
        {
          path: paths.warehouseReturn.WAREHOUSE_RETURN,
          lazy: async () => ({
            Component: (
              await import('@/pages/warehouse/pages/returning/index.tsx')
            ).default,
          }),
        },
        {
          path: paths.profile.PROFILE,
          lazy: async () => ({
            Component: (await import('@/pages/profile')).default,
          }),
        },
      ],
    },

    // Error routes
    { path: '/500', Component: GeneralError },
    { path: '/404', Component: NotFoundError },
    { path: '/503', Component: MaintenanceError },
    { path: '/401', Component: UnauthorisedError },

    // Fallback 404 route
    { path: '*', Component: NotFoundError },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
