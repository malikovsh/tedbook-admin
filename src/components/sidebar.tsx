import avatar from '@/assets/images/avatar-dark.webp';
import { UserRoleMap } from '@/constants/enum';
import {
  useSideLinks,
  useSideLinksForAccountant,
  useSideLinksForCourier,
  useSideLinksForWarehouse,
} from '@/data/sidelinks';
import { cn } from '@/lib/utils';
import { userRole } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './custom/button';
import { Layout } from './custom/layout';
import Nav from './nav';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  const role = useAppSelector(userRole);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  // Call all link hooks unconditionally
  const { sidelinks } = useSideLinks();
  const { sidelinksForAccountant } = useSideLinksForAccountant();
  const { sidelinksForCourier } = useSideLinksForCourier();
  const { sidelinksForWarehouse } = useSideLinksForWarehouse();

  const navLinks = useMemo(() => {
    switch (role) {
      case UserRoleMap.Admin:
        return sidelinks; // Use the value here
      case UserRoleMap.Accountant:
        return sidelinksForAccountant; // Use the value here
      case UserRoleMap.Courier:
      case UserRoleMap.Logistician:
      case UserRoleMap.Operator:
        return sidelinksForCourier; // Use the value here
      case UserRoleMap.Warehouse:
        return sidelinksForWarehouse; // Use the value here
      default:
        return sidelinks; // Use the value here
    }
  }, [role, sidelinks, sidelinksForAccountant, sidelinksForCourier]); // Add dependencies

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? 'md:w-14' : 'md:w-64'
        }`,
        className,
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
        } w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <Link to="/">
            <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
              <div
                className={`${
                  isCollapsed ? 'visible' : 'invisible'
                } text-[1.5rem] font-semibold text-black dark:text-white`}
              >
                T
              </div>
              <div
                className={`flex flex-col justify-end truncate ${
                  isCollapsed ? 'invisible w-0' : 'visible w-auto'
                }`}
              >
                <img
                  className="w-[65%]"
                  src={avatar}
                  alt="Avatar in light mode"
                />
              </div>
            </div>
          </Link>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto ${
            navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={navLinks} // Make sure navLinks is an array
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute z-50 hidden rounded-full -right-5 top-1/2 md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
