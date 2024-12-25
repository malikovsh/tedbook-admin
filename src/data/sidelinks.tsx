import {
  IconBuildingWarehouse,
  IconHistory,
  IconLayoutDashboard,
  IconLocation,
  IconReport,
  IconRosetteDiscount,
  IconSettings,
  IconShoppingCart,
  IconStack2,
  IconTruckDelivery,
  IconUserCog,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon?: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export function useSideLinks() {
  const { t } = useTranslation();

  const sidelinks: SideLink[] = [
    {
      title: t('nav.dashboard'),
      label: '',
      href: '/dashboard',
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: t('nav.users'),
      label: '',
      href: '/users',
      icon: <IconUserCog size={18} />,
    },
    {
      title: t('nav.orders'),
      label: '',
      href: '/orders',
      icon: <IconTruckDelivery size={18} />,
    },
    {
      title: t('nav.accountant'),
      label: '',
      href: '/accountant',
      icon: <IconRosetteDiscount size={18} />,
    },
    {
      title: t('nav.warehouse'),
      label: '',
      href: '',
      icon: <IconStack2 size={18} />,
      sub: [
        {
          title: t('Dashboard'),
          label: '',
          href: '/warehouse-dashboard',
          icon: <IconLayoutDashboard size={18} />,
        },
        {
          title: t('Mahsulotlar ombori'),
          label: '',
          href: '/warehouse',
          icon: <IconBuildingWarehouse size={18} />,
        },
        {
          title: t('Qaytarilayotgan'),
          label: '',
          href: '/warehouse-returning',
          icon: <IconReport size={18} />,
        },
        {
          title: t('Tarix'),
          label: '',
          href: '/warehouse-history',
          icon: <IconHistory size={18} />,
        },
      ],
    },
    {
      title: t('nav.settings.title'),
      label: '',
      href: '',
      icon: <IconSettings size={18} />,
      sub: [
        {
          title: t('nav.settings.products'),
          label: '',
          href: '/products',
          icon: <IconShoppingCart size={18} />,
        },
        {
          title: t('nav.settings.locations'),
          label: '',
          href: '/locations',
          icon: <IconLocation size={18} />,
        },
      ],
    },
  ];

  return { sidelinks };
}

export function useSideLinksForAccountant() {
  const { t } = useTranslation();

  const sidelinksForAccountant: SideLink[] = [
    {
      title: t('nav.dashboard'),
      label: '',
      href: '/dashboard',
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: t('nav.settings.products'),
      label: '',
      href: '/product',
      icon: <IconShoppingCart size={18} />,
    },
    {
      title: t('nav.accountant'),
      label: '',
      href: '/accountant',
      icon: <IconRosetteDiscount size={18} />,
    },
  ];

  return { sidelinksForAccountant };
}

export function useSideLinksForCourier() {
  const { t } = useTranslation();

  const sidelinksForCourier: SideLink[] = [
    {
      title: t('nav.dashboard'),
      label: '',
      href: '/dashboard',
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: t('nav.orders'),
      label: '',
      href: '/orders',
      icon: <IconTruckDelivery size={18} />,
    },
  ];

  return { sidelinksForCourier };
}

export function useSideLinksForWarehouse() {
  const { t } = useTranslation();

  const sidelinksForWarehouse: SideLink[] = [
    {
      title: t('nav.warehouse'),
      label: '',
      href: '',
      icon: <IconStack2 size={18} />,
      sub: [
        {
          title: t('Dashboard'),
          label: '',
          href: '/warehouse-dashboard',
          icon: <IconLayoutDashboard size={18} />,
        },
        {
          title: t('Ombor'),
          label: '',
          href: '/warehouse',
          icon: <IconStack2 size={18} />,
        },
        {
          title: t('Qaytarilayotgan'),
          label: '',
          href: '/warehouse-returning',
          icon: <IconReport size={18} />,
        },
        {
          title: t('Tarix'),
          label: '',
          href: '/warehouse-history',
          icon: <IconHistory size={18} />,
        },
      ],
    },
  ];

  return { sidelinksForWarehouse };
}
