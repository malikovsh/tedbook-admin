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
import { useUpdateProduct } from '@/hooks/useProductQuery';
import { cn } from '@/lib/utils';
import { selectProductData } from '@/redux/selectors/product';
import { useAppSelector } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface ProductProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  title: z.string().min(3, { message: 'errors.title' }),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(4, { message: 'errors.price' }),
  ),
  comment: z.string().optional(),
});

export default function EditProduct({ className, ...props }: ProductProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectProduct: any = useAppSelector(selectProductData);

  const { mutate, isPending } = useUpdateProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: selectProduct?.title || '',
      price: selectProduct?.price || 0,
      comment: selectProduct?.comment || '',
    },
  });

  function onSubmit() {
    mutate(
      {
        id: selectProduct?._id || '',
        body: form.getValues(),
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('pages.settings.products.details.product')}: {selectProduct?.title}{' '}
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
              name="title"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.settings.products.details.title')}:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('pages.settings.products.details.title')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.settings.products.details.price')}:
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t('pages.settings.products.details.price')}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.settings.products.details.comment')}:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('pages.settings.products.details.comment')}
                      {...field}
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
