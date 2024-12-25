import socketService from '@/api/socketService';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const UpdateOrderService = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  const tostText = {
    create: {
      title: t('toastMessages.orders.create.success.title'),
      desc: t('toastMessages.orders.create.success.desc'),
    },
    update: {
      title: t('toastMessages.orders.update.success.title'),
      desc: t('toastMessages.orders.update.success.desc'),
    },
  };

  useEffect(() => {
    socketService.connect();

    socketService.onOrderUpdated(
      (data: {
        message: string;
        orderId: string;
        type: 'create' | 'update';
      }) => {
        toast({
          title: tostText[data.type].title,
          description: tostText[data.type].desc,
        });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      },
    );

    return () => {
      socketService.disconnect();
    };
  }, [queryClient]);

  return <>{children}</>;
};
export default UpdateOrderService;
