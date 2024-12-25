import { Layout } from '@/components/custom/layout';
import { useUpdateProfile } from '@/hooks/useUsersQuery';
import { setProfilPic } from '@/redux/reducers/auth';
import { selectUser } from '@/redux/selectors/auth';
import { useAppDispatch } from '@/redux/store';
import { PersonIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function Profile() {
  const API_URL = import.meta.env.VITE_BASE_URI;
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { mutate: updateProfile } = useUpdateProfile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      updateProfile(
        { id: user.id, profilePic: selectedFile },
        {
          onSuccess: (data: any) => {
            dispatch(setProfilPic(data?.user?.profilePic));
          },
        },
      );
    }
  };

  return (
    <Layout.Body>
      <div className="flex items-center">
        <div
          className="relative group flex items-center justify-center cursor-pointer border rounded-[20px] w-[100px] h-[100px]"
          onClick={() => fileInputRef.current?.click()}
        >
          {user?.profilePic ? (
            <img
              src={API_URL + '/' + user.profilePic}
              alt="Profil"
              className="rounded-[20px] w-[100px] h-[100px]"
            />
          ) : (
            <PersonIcon className="w-[80px] h-[80px] text-primary-500" />
          )}
          <div className="absolute inset-0 text-xs text-center flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 rounded-[20px] transition-opacity duration-300">
            {t('pages.profile.uploadImage')}
          </div>
        </div>
        <div className="ml-[40px]">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-sm text-muted-foreground mt-[10px]">{user.role}</p>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </Layout.Body>
  );
}
