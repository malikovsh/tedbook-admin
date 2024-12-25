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
import { useCreateProduct } from '@/hooks/useProductQuery';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface ProductProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  title: z.string().min(3, { message: 'Iltimos sarlavha kiriting' }),
  price: z.number().min(4, { message: 'Iltimos narx kiriting' }),
  comment: z?.string(),
});

export default function CreateProduct({ className, ...props }: ProductProps) {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: 599000,
      comment: '',
    },
  });

  function onSubmit() {
    mutate(form.getValues(), {
      onSuccess: () => {
        navigate(-1);
      },
    });
  }

  const { t } = useTranslation();

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('pages.settings.products.create.title')}
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
                    {t('pages.settings.products.create.fields.heading')}:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        'pages.settings.products.create.placeholder.enterTitle',
                      )}
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
                <FormItem className="mt-3 flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.settings.products.create.fields.price')}:
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="mt-3 flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.settings.products.create.fields.comment')}:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        'pages.settings.products.create.placeholder.enterComment',
                      )}
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
