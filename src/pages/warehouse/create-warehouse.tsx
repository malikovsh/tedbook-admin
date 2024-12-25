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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProductQuery } from '@/hooks/useProductQuery';
import { useCreateWarehouse } from '@/hooks/useWarehouseQuery';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface WarehouseProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export default function CreateWareHouse({
  className,
  ...props
}: WarehouseProps) {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useCreateWarehouse();
  const { resData }: { resData: any } = useProductQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  function onSubmit() {
    const formData = form.getValues();
    const selectedProduct = resData[Number(formData.productId)];

    const payload = {
      productId: selectedProduct._id,
      quantity: formData.quantity,
    };

    mutate(payload, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  const { t } = useTranslation();

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t(`Mahsulot qo'shish`)}
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
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">{t('Nomi')}:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('Mahsulot nomi')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{t('Nomi')}</SelectLabel>
                            {resData.map((item: any, index: number) => (
                              <SelectItem value={String(index)} key={index}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="mt-3 flex items-center space-y-1">
                  <FormLabel className="w-[300px]">{t('Soni')}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Narx kiriting"
                      {...field}
                      onChange={(e) => {
                        if (isNaN(Number(e.target.value))) return;
                        field.onChange(Number(e.target.value));
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
                form.reset();
                navigate(-1);
              }}
            >
              <IconArrowLeftDashed size={18} className="me-2" />{' '}
              {t('pages.settings.products.create.buttons.back')}
            </Button>
            <Button loading={isPending}>
              {t('pages.settings.products.create.buttons.create')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
