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
import { useUpdateWarehouse } from '@/hooks/useWarehouseQuery';
import { cn } from '@/lib/utils';
import { selectWarehouseData } from '@/redux/selectors/werehouse';
import { useAppSelector } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface WareHouseProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  quantity: z.number(),
});

export default function EditWarehouse({ className, ...props }: WareHouseProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectWerehouse: any = useAppSelector(selectWarehouseData);

  const { mutate, isPending } = useUpdateWarehouse();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: selectWerehouse?.quantity,
    },
  });

  function onSubmit() {
    mutate(
      {
        id: selectWerehouse?._id || '',
        body: { quantity: form.getValues('quantity') },
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
    navigate(-1);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('Mahsulot')}: {selectWerehouse?.productId.title}{' '}
        </h1>
        <div
          data-orientation="horizontal"
          role="none"
          className="my-4 h-[1px] w-full shrink-0 bg-border lg:my-6"
        ></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-[40%] gap-2">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">{t('Soni')}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('Soni')}
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
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
              onClick={() => {
                navigate(-1);
              }}
            >
              <IconArrowLeftDashed size={18} className="me-2" />{' '}
              {t('pages.settings.products.details.buttons.back')}
            </Button>
            <Button loading={isPending}>
              {t('pages.settings.products.details.buttons.change')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
