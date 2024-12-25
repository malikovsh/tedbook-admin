import { Button } from '@/components/custom/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { UserRoleArray, UserRoleTitles } from '@/constants/enum';
import {
  useCreateUser,
  useGetAllUsersByRoleMutation,
  useUpdateProfile,
} from '@/hooks/useUsersQuery';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonIcon, UploadIcon } from '@radix-ui/react-icons';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface UserProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(1, { message: '' }),
  username: z.string().min(3, { message: '' }),
  password: z.string().min(4, {
    message: '',
  }),
  salary: z.number(),
  role: z.enum(UserRoleArray, {
    message: '',
  }),
  isBoss: z?.boolean(),
  assistants: z.array(z.string()),
  shift: z?.number(),
  isActive: z.boolean().default(true),
});

export default function CreateUser({ className, ...props }: UserProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, data } = useGetAllUsersByRoleMutation();
  const { mutate: createUserMutate, isPending } = useCreateUser();
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: updateProfile } = useUpdateProfile();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      salary: 0,
      isBoss: false,
      assistants: [],
      shift: 0,
      isActive: true,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const selectOptions = [
    {
      label: 'Role',
      options: UserRoleArray.map((role) => ({
        label: UserRoleTitles(t)[role],
        value: role,
      })),
    },
  ];

  useEffect(() => {
    if (form.watch('role')) {
      mutate(form.watch('role'));
    }
  }, [form.watch('role')]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createUserMutate(values, {
      onSuccess: (data: any) => {
        if (image && fileInputRef.current?.files) {
          updateProfile(
            { id: data.userId, profilePic: image },
            {
              onSuccess: () => {
                form.reset();
              },
            },
          );
        }
        navigate(-1);
      },
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('pages.users.create.title')}
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
            <div className="flex items-end mb-[15px] space-y-1">
              <FormLabel className="w-[185px]">
                {t('pages.users.edit.image')}:
              </FormLabel>
              <div
                className="relative group flex border rounded-[20px] cursor-pointer w-[70px] h-[70px] min-w-[70px] min-h-[70px] items-center justify-center"
                onClick={handleButtonClick}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image as Blob)}
                    alt="Profil"
                    className="rounded-[20px] w-[70px] h-[70px]"
                  />
                ) : (
                  <PersonIcon className="w-[32px] h-[32px] text-primary-500" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-[10px] opacity-0 group-hover:opacity-100 rounded-[20px] transition-opacity duration-300">
                  <UploadIcon width={20} height={20} />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.name')}:{' '}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('pages.users.create.fields.name')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.username')}:{' '}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.salary')}:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4000000"
                      {...field}
                      onChange={(e) => {
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.passwd')}:{' '}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('pages.users.create.fields.passwd')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  {selectOptions.map((selectField, index) => (
                    <div key={index} className="flex items-center space-y-1">
                      <FormLabel className="w-[300px]">
                        {t('pages.users.create.fields.role')}:{' '}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                t('pages.users.create.fields.role') +
                                ' ' +
                                t('global.selectPlaceholder')
                              }
                              defaultValue={field.value}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {selectField.options.map((option, idx) => (
                                <SelectItem key={idx} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  ))}
                </FormItem>
              )}
            />
            {/* Updated Shift Selection */}
            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.users.create.fields.shift')}:
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              t('pages.users.create.fields.shift') +
                              ' ' +
                              t('global.selectPlaceholder')
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {t('pages.users.create.fields.shift')}
                            </SelectLabel>
                            <SelectItem value="0">
                              {t('pages.users.create.fields.shift')}{' '}
                              {t('global.selectPlaceholder')}
                            </SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
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
              name="isBoss"
              render={({ field }) => (
                <FormItem>
                  {!form.watch('role') && (
                    <span className="block mt-6 text-sm text-red-500">
                      {t('pages.users.create.messages.required')}
                    </span>
                  )}
                  <div className="flex items-center mt-3 space-y-1">
                    <FormLabel className="text-xl me-3">
                      {t('pages.users.create.fields.isBoss')}
                    </FormLabel>
                    <FormControl className="!mt-0 flex items-center justify-center">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          if (form.watch('role')) {
                            // Check if a role is selected
                            field.onChange(checked);
                          }
                        }}
                        name={field.name}
                        ref={field.ref}
                        disabled={!form.watch('role')} // Disable the checkbox if no role is selected
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('isBoss') && (
              <FormField
                control={form.control}
                name="assistants"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-1">
                    <FormLabel className="w-[300px]">
                      {t('pages.users.create.fields.assistants')}:
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={
                          data?.users?.map((user) => ({
                            label: user.name,
                            value: user._id,
                          })) || []
                        }
                        key={data?.users?.length}
                        onValueChange={field.onChange}
                        placeholder={
                          t('pages.users.create.fields.assistants') +
                          ' ' +
                          t('global.selectPlaceholder')
                        }
                        variant="inverted"
                        animation={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                navigate(-1);
              }}
            >
              <IconArrowLeftDashed size={18} className="me-2" />{' '}
              {t('pages.users.create.buttons.back')}
            </Button>
            <Button loading={isPending}>
              {t('pages.users.create.buttons.create')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
