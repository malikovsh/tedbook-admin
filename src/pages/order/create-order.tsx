import district from '@/api/districts.json';
import city from '@/api/villages.json';
import { Button } from '@/components/custom/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { selectRegion } from '@/constants/regions';
import { useCreateOrder } from '@/hooks/useOrderQuery';
import { useProductQuery } from '@/hooks/useProductQuery';
import { useLogisticianUsers } from '@/hooks/useUsersQuery';
import { cn } from '@/lib/utils';
import { selectUser } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { isArray } from 'lodash';
import { HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface OrderProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  operatorId: z.string(),
  fullName: z.string().min(3, { message: '' }),
  phoneNumber: z.string().min(9, { message: '' }),
  phoneNumber2: z.string().min(9, { message: '' }).or(z.null()).default(null),
  productsIds: z.array(z.string()).min(1, { message: '' }),
  region: z.string().min(3, { message: '' }),
  logisticianId: z.string().min(3, { message: '' }),
  address: z.string().or(z.null()).default(null),
  messages: z
    .array(
      z.object({
        commenterRole: z.string().min(3, { message: '' }),
        commentText: z.string().min(3, { message: '' }),
      }),
    )
    .default([]),
  district: z.array(z.string()),
  city: z.array(z.string()),
  paymentType: z.string().min(3, { message: "To'lov turini tanlang" }),
});

export default function CreateOrder({ className, ...props }: OrderProps) {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operatorId: user?.id,
      fullName: '',
      phoneNumber: '',
      phoneNumber2: null,
      productsIds: [],
      logisticianId: '',
      address: null,
      messages: [],
      region: '',
      district: [],
      city: [],
      paymentType: '',
    },
  });

  const { resData } = useProductQuery();
  const { data: LogisticianData } = useLogisticianUsers();
  const { mutate, isPending } = useCreateOrder();

  function onSubmit() {
    mutate(form.getValues(), {
      onSuccess: () => {
        navigate(-1);
      },
    });
  }

  const paymentTranslations: Record<string, string> = {
    cash: 'Naqd pul',
    card: 'Karta',
    'payment-systems': "To'lov tizimlari - (Click, payme, uzum)",
  };

  const { t } = useTranslation();

  useEffect(() => {
    toast({
      title: 'Eslatma!',
      description:
        'Buyurtmani yaratishdan oldin logistlar va mahsulotlar borligini tekshiring',
    });
  }, []);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid mb-3">
        <div className="grid">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('pages.orders.create.title')}
          </h1>
          <div
            data-orientation="horizontal"
            role="none"
            className="my-4 h-[1px] w-full shrink-0 bg-border lg:my-6"
          ></div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-[30%] gap-3">
              <FormField
                control={form.control}
                name="logisticianId"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-y-1">
                      <FormLabel className="w-[300px]">
                        {t('pages.orders.create.fields.selLogistician')}{' '}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              'pages.orders.create.fields.selLogistician',
                            )}
                            defaultValue={field.value || ''}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {t('pages.orders.create.fields.selLogistician')}
                            </SelectLabel>
                            {isArray(LogisticianData?.users) &&
                              LogisticianData?.users.map((option, idx) => (
                                <SelectItem key={idx} value={option._id}>
                                  {option.name}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.orders.create.fields.fullName')}{' '}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('pages.orders.create.fields.fullName')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.orders.create.fields.phoneNumber')}{' '}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('+998')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber2"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.orders.create.fields.phoneNumber')} 2
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('+998')}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productsIds"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.orders.create.fields.selProducts')}{' '}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      {isArray(resData) && resData.length > 0 ? (
                        <MultiSelect
                          options={resData.map((item: any) => ({
                            label: item.title,
                            value: item._id,
                          }))}
                          key={resData.length ?? 0}
                          onValueChange={field.onChange}
                          placeholder={t(
                            'pages.orders.create.fields.selProducts',
                          )}
                          variant="inverted"
                          animation={3}
                        />
                      ) : (
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t(
                                'pages.orders.create.fields.selProducts',
                              )}
                            />
                          </SelectTrigger>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-y-1">
                      <FormLabel className="w-[300px]">
                        {t('pages.orders.create.fields.regions')}{' '}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              'pages.orders.create.fields.regions',
                            )}
                            defaultValue={field.value || ''}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {t('pages.orders.create.fields.regions')}
                            </SelectLabel>
                            {selectRegion?.map((option, idx) => (
                              <SelectItem key={idx} value={option.label}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">Tumanlar</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={
                          isArray(district)
                            ? district?.map((item: any) => ({
                                label: item.name_uz,
                                value: item.name_uz,
                              }))
                            : []
                        }
                        key={district?.length ?? 0}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder="Tumanlar"
                        variant="inverted"
                        animation={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      Shaharlar yoki qishloqlar
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={
                          isArray(city)
                            ? city?.map((item: any) => ({
                                label: item.name_uz,
                                value: item.name_uz,
                              }))
                            : []
                        }
                        key={city?.length ?? 0}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder="Shaharlar yoki qishloqlar"
                        variant="inverted"
                        animation={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.orders.create.fields.address')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('pages.orders.create.fields.address')}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">To'lov turi</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="To'lov turini tanlang"
                            defaultValue={field.value || ''}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>To'lov turlari</SelectLabel>
                            {Object.entries(paymentTranslations).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ),
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  navigate(-1);
                }}
              >
                <IconArrowLeftDashed size={18} className="me-2" />{' '}
                {t('pages.orders.create.buttons.back')}
              </Button>
              <Button loading={isPending}>
                {t('pages.orders.create.buttons.save')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
