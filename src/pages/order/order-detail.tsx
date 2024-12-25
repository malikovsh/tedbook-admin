import socketService from '@/api/socketService';
import { Button } from '@/components/custom/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  OperatorAndCourierRoles,
  OperatorAndCourierRolesTitles,
} from '@/constants/enum';
import useOrderAccessRole from '@/hooks/useOrderAccessRole';
import { cn, convertToReadableDate } from '@/lib/utils';
import { userRole } from '@/redux/selectors/auth';
import { selectOrderDetailsData } from '@/redux/selectors/orderDetails';
import { useAppSelector } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { IconChevronLeft, IconSend } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { isArray, reverse } from 'lodash';
import {
  Fragment,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  note: z.string().min(3, { message: 'Iltimos, ismingizni kiriting' }),
});

export default function OrderDetails({ className, ...props }: Props) {
  const navigate = useNavigate();
  const role = useAppSelector(userRole);
  const data = useSelector(selectOrderDetailsData);
  const { isLogistician, isAdmin, isOperatorOrCourier } = useOrderAccessRole();
  const [comments, setComments] = useState(
    (isArray(data?.messages) && data.messages) || [],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: '',
    },
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const joinRoomIfConnected = async () => {
      if (!socketService.isConnected) {
        console.warn('Socket is not connected. Connecting now...');
        socketService.connect();
      }

      if (data?._id) {
        socketService.joinRoom(data._id);
        socketService.onNewComment((newComment) => {
          setComments((prev: any) => [...prev, newComment]);
        });
      }
    };

    joinRoomIfConnected();

    return () => {
      console.log('Cleaning up room listeners...');
      socketService.on('newComment', () => {});
    };
  }, [data?._id]);

  const handleEdit = () => {
    navigate(`/orders/${data?._id}/update`);
  };

  const handleTextSent = (commentText: string) => {
    if (socketService.isConnected && data?._id) {
      socketService.emit('sendMessage', {
        orderId: data._id,
        commenterRole: 'operator',
        commentText,
      });
      form.reset();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const paymentTranslations: Record<string, string> = {
    cash: 'Naqd pul',
    card: 'Karta',
    'payment-systems': "To'lov tizimlari",
  };

  const statusTranslations: Record<string, string> = {
    'Pending (In the logist)': 'Kutilmoqda (logistda)',
    'Pending (In the courier)': 'Kutilmoqda (kuryerda)',
    Delivered: 'Yetkazib berilgan',
    Canceled: 'Bekor qilingan',
  };

  function formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `${Math.round(seconds)} sec`;
    }

    const minutes = seconds / 60;
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    }

    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.round(hours)} hr`;
    }

    const days = hours / 24;
    if (days < 7) {
      return `${Math.round(days)} day`;
    }

    const weeks = days / 7;
    return `${Math.round(weeks)} week`;
  }

  const currentMessages = useMemo(
    () =>
      reverse([...comments]).reduce((acc: Record<string, any>, obj) => {
        const key = dayjs(obj.createdAt).format('D MMM, YYYY');

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(obj);
        return acc;
      }, {}),
    [comments],
  );

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('pages.orders.details.title')}
        </h1>
        <div className="flex flex-row gap-2">
          {isLogistician && (
            <Button onClick={handleEdit}>
              <span>{t('pages.orders.details.edit')} </span>
              <Pencil2Icon />
            </Button>
          )}
          {isAdmin && (
            <Button>
              <span>{t('pages.orders.details.delete')} </span>
              <TrashIcon />
            </Button>
          )}

          <Button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IconChevronLeft className="w-[18px]" />
            <span>{t('pages.orders.details.back')}</span>
          </Button>
        </div>
      </div>
      <div className="card rounded-xl border-[1px] px-6">
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.fullName')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <p className="text-90">{data?.fullName || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.createdAt')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <p className="text-90">
              {convertToReadableDate(data?.createdAt as string) || 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.createdBy')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <span>{data?.operatorId?.name || 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.responsibleLogistician')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <span>{data?.logisticianId?.name || 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.responsibleCourier')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <span>{data?.courierId?.name || 'Buyurtma kuryerda emas'}</span>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.status')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <span>
              {statusTranslations[
                data?.status as keyof typeof statusTranslations
              ] || data?.status}{' '}
            </span>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.phoneNumber')}:
            </h4>
          </div>
          <div className="flex flex-col w-3/4 py-3 break-words">
            <span className="no-underline">{data?.phoneNumber || 'N/A'}</span>
            {data?.phoneNumber2 && (
              <span className="no-underline">{data?.phoneNumber2}</span>
            )}
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.products')}:
            </h4>
          </div>
          <div className="flex flex-col w-3/4 py-3 break-words">
            {data?.productsIds?.map((item: any) => (
              <span key={item._id} className="font-normal no-underline dim">
                {item?.title} [{item?.price} UZS]
              </span>
            ))}
          </div>
        </div>
        <div className="flex px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">Viloyat:</h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <h4 className="font-normal text-80">{data?.region || 'N/A'}</h4>
          </div>
        </div>
        <div className="flex px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">Shahar yoki qishloq:</h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <h4 className="font-normal text-80">{data?.city || 'N/A'}</h4>
          </div>
        </div>
        <div className="flex px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">Tuman:</h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <h4 className="font-normal text-80">{data?.district || 'N/A'}</h4>
          </div>
        </div>
        <div className="flex items-center px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.address')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <h4 className="font-normal text-80">{data?.address || 'N/A'}</h4>
          </div>
        </div>
        <div className="flex px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.paymentsType')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            <h4 className="font-normal text-80">
              <ul className="">
                {data?.payments.map((payment: any) => (
                  <li>
                    {paymentTranslations[payment.method] || payment.method}:{' '}
                    {payment.amount.toLocaleString()}so'm
                  </li>
                )) || 'N/A'}
              </ul>
            </h4>
          </div>
        </div>
        <div className="flex px-6 -mx-6 border-b border-40">
          <div className="w-1/4 py-3">
            <h4 className="font-medium text-80">
              {t('pages.orders.details.fields.editingHistory')}:
            </h4>
          </div>
          <div className="w-3/4 py-3 break-words">
            {data?.editHistory.map((item, index) => (
              <ul key={`editHistory-${index}`}>
                <li>
                  {item.editorId.name} - {formatDuration(item.editDuration)}
                </li>
              </ul>
            )) || 'N/A'}
          </div>
        </div>
      </div>
      <div className="rounded-xl border-[1px] px-4 pb-4 pt-0">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-1 size-full">
            <div className="relative flex flex-col flex-1 -mr-4 overflow-y-hidden chat-text-container">
              <div className="flex flex-col-reverse justify-start flex-grow w-full gap-4 py-2 pb-4 pr-4 overflow-y-auto chat-flex h-80">
                {role !== 'operator' && role !== 'logistician' ? (
                  <h2 className="font-mono text-sm ms-3">
                    {t('pages.orders.details.requireMsg')}
                  </h2>
                ) : (
                  <div></div>
                )}

                <div ref={messagesEndRef} />
                {currentMessages &&
                  Object.keys(currentMessages).map((key) => (
                    <Fragment key={key}>
                      {currentMessages[key].map((msg: any, index: any) => (
                        <div
                          key={`${msg.commenterRole}-${msg.createdAt}-${index}`}
                          className={cn(
                            'chat-box max-w-72 break-words px-3 py-2 shadow-lg',
                            msg.commenterRole !== role
                              ? '-foreground/75 bg-primary/8 self-start rounded-[16px_16px_0_16px]'
                              : 'self-end rounded-[16px_16px_16px_0] bg-secondary',
                          )}
                        >
                          <span
                            className={cn(
                              'mb-1 block font-light text-muted-foreground',
                              msg.commenterRole === role && 'text-right',
                            )}
                          >
                            {msg.commenterRole === role
                              ? 'Siz'
                              : OperatorAndCourierRoles.includes(
                                    msg.commenterRole,
                                  )
                                ? OperatorAndCourierRolesTitles[
                                    msg.commenterRole as keyof typeof OperatorAndCourierRolesTitles
                                  ]
                                : ''}
                          </span>
                          {msg.commentText}
                          <span
                            className={cn(
                              'mt-1 block text-xs font-light italic text-muted-foreground',
                              msg.commenterRole === role && 'text-right',
                            )}
                          >
                            {dayjs(msg.createdAt).format('H:mm')}
                          </span>
                        </div>
                      ))}
                      <div className="text-xs text-center">{key}</div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleTextSent(values.note),
            )}
            className="flex flex-none w-full gap-2"
          >
            <div className="flex items-center flex-1 gap-2 px-2 py-1">
              <label className="flex-1">
                <Input
                  type="text"
                  placeholder={t('pages.orders.details.enterMessage')}
                  className="w-full h-8 bg-inherit"
                  disabled={!isOperatorOrCourier && role !== 'logistician'}
                  {...form.register('note')}
                />
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                type="submit"
                disabled={!isOperatorOrCourier && role !== 'logistician'}
              >
                <IconSend size={20} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
