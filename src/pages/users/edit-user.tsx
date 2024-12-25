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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateProfile, useUpdateUser } from '@/hooks/useUsersQuery';
import { cn } from '@/lib/utils';
import { selectUserData } from '@/redux/selectors/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { UserRoleArray, UserRoleTitles } from '@/constants/enum';
import { setUserProfilePic } from '@/redux/reducers/users';
import { useAppDispatch } from '@/redux/store';
import { PersonIcon, UploadIcon } from '@radix-ui/react-icons';
import { IconArrowLeftDashed } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface UserProps extends HTMLAttributes<HTMLDivElement> {}
const API_URL = import.meta.env.VITE_BASE_URI;

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Ushbu maydon majburiy va u 3-dan harfni kutmoqda',
  }),
  username: z.string().min(3, {
    message: 'Ushbu maydon majburiy va u 3-dan harfni kutmoqda',
  }),
  password: z.string(),
  role: z.enum(UserRoleArray),
  shift: z.number().nullable(),
});

export default function EditUser({ className, ...props }: UserProps) {
  const navigate = useNavigate();
  const { mutate: updateUserMutate, isPending } = useUpdateUser();
  const { mutate: updateProfile } = useUpdateProfile();
  const user = useSelector(selectUserData);
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && user) {
      updateProfile(
        { id: user._id, profilePic: selectedFile },
        {
          onSuccess: (data: any) => {
            dispatch(setUserProfilePic(data?.user?.profilePic));
          },
        },
      );
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      password: '',
      shift: user?.shift || null,
      role: user?.role as any,
    },
  });

  const selectOptions = [
    {
      label: 'Role',
      options: UserRoleArray.map((role) => ({
        label: UserRoleTitles(t)[role],
        value: role,
      })),
    },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      updateUserMutate(
        {
          id: user._id,
          body: values,
        },
        {
          onSuccess: () => {
            navigate(-1);
            form.reset();
          },
        },
      );
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('pages.users.edit.title')}
        </h1>
        <div
          data-orientation="horizontal"
          role="none"
          className="my-4 h-[1px] w-full shrink-0 bg-border lg:my-6"
        ></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-end mb-[15px] w-[40%] gap-2">
            <FormLabel className="w-[170px] flex">
              {t('pages.users.edit.image')}:
            </FormLabel>
            <div
              className="relative group flex border rounded-[20px] cursor-pointer w-[70px] h-[70px] items-center justify-center"
              onClick={handleButtonClick}
            >
              {user?.profilePic ? (
                <img
                  src={API_URL + '/' + user.profilePic}
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
          <div className="grid w-[40%] gap-2">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.name')}:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.username')}:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.passwd')}:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  {selectOptions.map((selectField, index) => (
                    <div key={index} className="flex items-center space-y-1">
                      <FormLabel className="w-[300px]">
                        {t('pages.users.create.fields.role')}:
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Role tanlang"
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

            {/* Shift field */}
            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-1">
                  <FormLabel className="w-[300px]">
                    {t('pages.users.create.fields.shift')}:
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value?.toString() || '0'}
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
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                navigate(-1);
              }}
            >
              <IconArrowLeftDashed size={18} className="me-2" />{' '}
              {t('pages.users.edit.buttons.back')}
            </Button>
            <Button loading={isPending}>
              {t('pages.users.edit.buttons.save')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
