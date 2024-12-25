import { Button } from '@/components/custom/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRoleTitles } from '@/constants/enum';
import useAuth from '@/hooks/useAuth';
import { selectUser } from '@/redux/selectors/auth';
import paths from '@/router/paths';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_BASE_URI;

export function UserNav() {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleProfile = () => {
    navigate(paths.profile.PROFILE);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {user?.profilePic ? (
              <AvatarImage
                src={API_URL + '/' + user.profilePic}
                alt="@tedbook"
              />
            ) : (
              <AvatarFallback>{user?.username?.slice(0, 1)}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {t('pages.users.columns.role')}:{' '}
              {UserRoleTitles(t)[user?.role as keyof typeof UserRoleTitles]}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onSelect={handleProfile}>
          {t('pages.auth.buttons.profile')}
          <DropdownMenuShortcut>
            <PersonIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logout}>
          {t('pages.auth.buttons.logout')}
          <DropdownMenuShortcut>
            <ExitIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
