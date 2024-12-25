import { Layout } from '@/components/custom/layout';
import { LangSwitch } from '@/components/lang-switch';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { MY_ID } from '@/constants/localStore';
import useIsCollapsed from '@/hooks/use-is-collapsed';
import useAuth from '@/hooks/useAuth';
import { useGetMe } from '@/hooks/useUsersQuery';
import paths from '@/router/paths';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import SkipToMain from './skip-to-main';

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { mutate } = useGetMe();

  const myId = localStorage.getItem(MY_ID) || '';

  useEffect(() => {
    if (!isAuth) {
      navigate(paths.auth.LOGIN, { replace: true });
    } else if (myId) {
      mutate({ myId });
    }
  }, [isAuth, navigate, mutate, myId]);

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <SkipToMain />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Layout>
          {/* ===== Top Heading ===== */}
          <Layout.Header sticky>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitch />
              <LangSwitch />
              <UserNav />
            </div>
          </Layout.Header>

          <Layout.Body>
            <Outlet />
          </Layout.Body>
        </Layout>
      </main>
    </div>
  );
}
