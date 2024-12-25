import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { PasswordInput } from '@/components/custom/password-input';
import { cn } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z.string().min(3, { message: 'Ushbu maydon majburiy' }),
  password: z
    .string()
    .min(1, {
      message: 'Iltimos parolingizni kiriting',
    })
    .min(4, {
      message: "Kamida 4ta belgidan iborat bo'lishi shart",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuth();

  const { isPending, mutate } = login;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-2 space-y-1">
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Parol</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isPending}>
              Kirish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
