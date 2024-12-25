import { Card } from '@/components/ui/card';
import { UserAuthForm } from './components/user-auth-form';
import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import paths from '@/router/paths';
import avatar from '../../assets/images/avatar-dark.webp';

export default function SignIn2() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to={paths.home.HOME} replace />;
  }

  return (
    <>
      <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
          <div className="mb-[2rem] flex items-center justify-center">
            <img src={avatar} width={120} alt="Image not found" />
          </div>
          <Card className="p-6">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Xush kelibsiz! <br />
                Iltimos login va parolingizni kiriting
              </p>
            </div>
            <UserAuthForm />
          </Card>
        </div>
      </div>
    </>
  );
}
