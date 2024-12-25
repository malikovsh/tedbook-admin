import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/index.css';
import router from '@/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './i18n';
import { store } from './redux/store';

import '@fontsource-variable/open-sans';
import UpdateOrderService from './utils/UpdateOrderService';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UpdateOrderService>
          <RouterProvider router={router} />
        </UpdateOrderService>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </ThemeProvider>,
);
