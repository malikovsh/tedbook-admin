import { UserRole } from '@/constants/enum';
import { userRole } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { useMemo } from 'react';

const useOrderAccessRole = () => {
  const role = useAppSelector(userRole);

  const isAdmin = useMemo(() => role === UserRole.admin, [role]);

  const isLogistician = useMemo(
    () => role === UserRole.logistician || role === UserRole.admin,
    [role],
  );

  const isCourierOrAdmin = useMemo(
    () => role === UserRole.courier || role === UserRole.admin,
    [role],
  );

  const isOperatorOrAdmin = useMemo(
    () => role === UserRole.operator || role === UserRole.admin,
    [role],
  );

  const isOperatorOrCourier = useMemo(
    () => role === UserRole.operator || role === UserRole.courier,
    [role],
  );

  return {
    isAdmin,
    isLogistician,
    isCourierOrAdmin,
    isOperatorOrAdmin,
    isOperatorOrCourier,
  };
};

export default useOrderAccessRole;
