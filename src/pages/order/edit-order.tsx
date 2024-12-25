import { Button } from '@/components/custom/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUpdateOrder } from '@/hooks/useOrderQuery';
import { useGetAllUsersByRole } from '@/hooks/useUsersQuery';
import { cn } from '@/lib/utils';
import { selectOrderDetailsData } from '@/redux/selectors/orderDetails';
import { useAppSelector } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { isArray } from 'lodash';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface ProductProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  user: z.string().min(1, 'Ushbu maydon majburiy'),
  status: z.string(),
});

export default function EditOrder({ className, ...props }: ProductProps) {
  const navigate = useNavigate();
  const responseData = useAppSelector(selectOrderDetailsData);

  const { data: UsersData } = useGetAllUsersByRole('courier');
  const { mutate, isPending } = useUpdateOrder();

  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: '',
      status: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const updatedData = {
      courierId: data?.user,
      status: 'Pending (In the courier)',
    } as any;

    mutate(
      {
        id: responseData?._id as string,
        body: updatedData,
      },
      {
        onSuccess: () => {
          form.reset();
          navigate(-1);
        },
      },
    );
  }

  function onCancel() {
    const updatedData = {
      status: 'Canceled',
    } as any;

    mutate(
      {
        id: responseData?._id as string,
        body: updatedData,
      },
      {
        onSuccess: () => {
          form.reset();
          navigate(-1);
        },
      },
    );
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {responseData?.fullName}ni {t('pages.orders.edit.title')}
        </h1>
        <div
          data-orientation="horizontal"
          role="none"
          className="my-4 h-[1px] w-full shrink-0 bg-border lg:my-6"
        ></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem className="mt-3 flex flex-col gap-2 space-y-1">
                  <FormLabel className="text-sm font-normal">
                    {t('pages.orders.edit.fields.addCourier')}{' '}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[40%]">
                        <SelectValue
                          placeholder={t('pages.orders.edit.placeholder')}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {t('pages.orders.edit.fields.addCourier')}
                          </SelectLabel>
                          {isArray(UsersData?.users)
                            ? UsersData?.users.map((user: any) => (
                                <SelectItem key={user._id} value={user._id}>
                                  {user.name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              loading={isPending}
            >
              Bekor qilish
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                navigate(-1);
              }}
            >
              <IconArrowLeftDashed size={18} className="me-2" />{' '}
              {t('pages.orders.edit.buttons.back')}
            </Button>
            <Button loading={isPending}>
              {t('pages.orders.edit.buttons.update')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
