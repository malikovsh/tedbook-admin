import { useAppSelector } from '@/redux/store';
import { userRole } from '@/redux/selectors/auth';
import OrderList from './order';

export default function Order() {
  const role = useAppSelector(userRole);

  switch (role) {
    case 'admin':
    case 'operator':
      return <OrderList />;
    case 'logistician':
      return <OrderList />;
    case 'courier':
      return <OrderList />;
    default:
      return null;
  }
}
