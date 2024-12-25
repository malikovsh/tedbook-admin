import { useToast } from '@/components/ui/use-toast';
import { MY_ID } from '@/constants/localStore';
import { logoutAction } from '@/redux/reducers/auth';
import { useAppDispatch } from '@/redux/store';
import { loginThunk } from '@/redux/thunks/authThunk';
import paths from '@/router/paths';
import { LoginBodyType } from '@/types';
import { TokenService } from '@/utils/TokenService';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from './useQuery';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || paths.home.HOME;

  const isAuth = useMemo(() => TokenService.getAccessToken(), []);

  const login = useMutation({
    mutationFn: async (body: LoginBodyType) => {
      return await dispatch(loginThunk(body)).unwrap();
    },
    onSuccess: (data) => {
      TokenService.setTokenFromData(data.tokens);
      TokenService.setRefreshTokenFromData(data.tokens);
      localStorage.setItem(MY_ID, data.user.id);
      navigate(from);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Xatolik',
        description:
          "Iltimos, login va parolni tekshirib qaytadan urinib ko'ring",
        variant: 'destructive',
      });
    },
  });

  const logout = () => {
    TokenService.clearTokens();
    dispatch(logoutAction());
    navigate(paths.auth.LOGIN);
  };

  return {
    login,
    isAuth,
    logout,
  };
};

export default useAuth;
