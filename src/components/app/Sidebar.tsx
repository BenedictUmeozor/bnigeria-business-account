import clsx from 'clsx';
import { ReactNode, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboardIcon,
  FolderIcon,
  PieChartIcon,
  SendIcon,
  WorkflowIcon,
  UsersIcon,
  UserIcon,
  LogOutIcon,
  XIcon,
  BriefcaseIcon,
} from 'lucide-react';
import { Button } from 'antd';

interface MenuItem {
  key: string;
  icon: ReactNode;
  label: string;
  to: string;
  active: boolean;
}

const Sidebar = () => {
  const { pathname } = useLocation();

  const MENU = [
    {
      key: '1',
      label: 'Onboarding',
      icon: <FolderIcon className="h-4 w-4" />,
      to: '/onboarding',
      active: pathname.startsWith('/onboarding'),
    },
    {
      key: '2',
      label: 'Dashboard',
      icon: <LayoutDashboardIcon className="h-4 w-4" />,
      to: '/dashboard',
      active: pathname.startsWith('/dashboard'),
    },
    {
      key: '3',
      label: 'Accounts',
      icon: <PieChartIcon className="h-4 w-4" />,
      to: '/accounts',
      active: pathname.startsWith('/accounts'),
    },
    {
      key: '4',
      label: 'Transfers',
      icon: <SendIcon className="h-4 w-4" />,
      to: '/transfers',
      active: pathname.startsWith('/transfers'),
    },
    {
      key: '5',
      label: 'Transactions',
      icon: <WorkflowIcon className="h-4 w-4" />,
      to: '/transactions',
      active: pathname.startsWith('/transactions'),
    },
    {
      key: '6',
      label: 'Beneficiaries',
      icon: <UsersIcon className="h-4 w-4" />,
      to: '/beneficiaries',
      active: pathname.startsWith('/beneficiaries'),
    },
  ];

  const disabled = useMemo(() => {
    return pathname.includes('onboarding');
  }, [pathname]);

  const menuItems: MenuItem[] = useMemo(() => {
    // if (!onboardingStatus?.completed || pathname.includes("onboarding")) {
    //   return MENU;
    // }
    // return MENU.filter(item => item.key !== "1");

    return MENU;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <aside className="no-scrollbar relative grid h-screen w-[200px] grid-rows-[auto_1fr] gap-6 overflow-y-auto bg-secondary-500 pb-6 max-lg:hidden">
      {/* {loading && <Loader />} */}
      <a
        href="https://hellomemoney.com/"
        className="sticky top-0 z-10 flex items-center justify-center gap-2 bg-secondary-500 pb-2 pt-6"
      >
        <img src="/images/hellome.png" alt="Hellomemoney" className="h-7 w-7" />
        <p className="font-cabinet text-lg font-bold text-white no-underline">
          HelloMe Money
        </p>
      </a>
      <div className="space-y-12">
        <nav className="space-y-8">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li
                key={item.key}
                className={clsx(
                  'border-0 border-r-4 border-solid transition-all duration-200 ease-linear hover:border-r-secondary-200 hover:bg-secondary-400',
                  {
                    'border-r-secondary-200 bg-secondary-400': item.active,
                  },
                  { 'border-r-transparent': !item.active },
                  { 'opacity-50': disabled && !item.active },
                )}
              >
                {disabled && !item.active ? (
                  <p
                    className={clsx(
                      'mx-auto flex w-[80%] cursor-not-allowed items-center gap-2 py-2.5 text-base font-normal',
                      !item.active && 'text-primary-300',
                      item.active && 'text-white',
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </p>
                ) : (
                  <Link
                    to={item.to}
                    className={clsx(
                      'mx-auto flex w-[80%] items-center gap-2 py-2.5 text-base font-normal',
                      !item.active && 'text-primary-300',
                      item.active && 'text-white',
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mx-auto h-[1px] w-[85%] bg-primary-700" />
          <ul className="space-y-2">
            <li
              className={clsx(
                'border-0 border-r-4 border-solid transition-all duration-200 ease-linear hover:border-r-secondary-200 hover:bg-secondary-400',
                {
                  'border-r-secondary-200 bg-secondary-400':
                    pathname.startsWith('/virtual-office'),
                },
                {
                  'border-r-transparent':
                    !pathname.startsWith('/virtual-office'),
                },
                {
                  'opacity-50':
                    disabled && !pathname.startsWith('/virtual-office'),
                },
              )}
            >
              {disabled ? (
                <p
                  className={clsx(
                    'mx-auto flex w-[80%] items-center gap-2 py-2.5 text-base font-normal',
                    !pathname.startsWith('/virtual-office') &&
                      'cursor-not-allowed text-primary-300',
                    pathname.startsWith('/virtual-office') && 'text-white',
                  )}
                >
                  <BriefcaseIcon className="h-4 w-4" />
                  <span>Virtual Office</span>
                </p>
              ) : (
                <Link
                  to="/virtual-office"
                  className={clsx(
                    'mx-auto flex w-[80%] items-center gap-2 py-2.5 text-base font-normal',
                    !pathname.startsWith('/virtual-office') &&
                      'text-primary-300',
                    pathname.startsWith('/virtual-office') && 'text-white',
                  )}
                >
                  <BriefcaseIcon className="h-4 w-4" />
                  <span>Virtual Office</span>
                </Link>
              )}
            </li>
            <li
              className={clsx(
                'border-0 border-r-4 border-solid transition-all duration-200 ease-linear hover:border-r-secondary-200 hover:bg-secondary-400',
                {
                  'border-r-secondary-200 bg-secondary-400':
                    pathname.startsWith('/profile'),
                },
                { 'border-r-transparent': !pathname.startsWith('/profile') },
                { 'opacity-50': disabled && !pathname.startsWith('/profile') },
              )}
            >
              {disabled ? (
                <p
                  className={clsx(
                    'mx-auto flex w-[80%] items-center gap-2 py-2.5 text-base font-normal',
                    !pathname.startsWith('/profile') &&
                      'cursor-not-allowed text-primary-300',
                    pathname.startsWith('/profile') && 'text-white',
                  )}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Profile</span>
                </p>
              ) : (
                <Link
                  to="/profile"
                  className={clsx(
                    'mx-auto flex w-[80%] items-center gap-2 py-2.5 text-base font-normal',
                    !pathname.startsWith('/profile') && 'text-primary-300',
                    pathname.startsWith('/profile') && 'text-white',
                  )}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              )}
            </li>
            <li className="cursor-pointer border-0 border-r-4 border-solid transition-all duration-200 ease-linear hover:border-r-secondary-200 hover:bg-secondary-400">
              <p className="mx-auto flex w-[80%] items-center gap-2 py-2.5 text-base font-normal text-primary-300">
                <LogOutIcon className="h-4 w-4" />
                <span>Log out</span>
              </p>
            </li>
          </ul>
        </nav>
        <Closable />
      </div>
    </aside>
  );
};

const Closable = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="mx-auto flex w-[90%] flex-col gap-4 rounded-xl bg-secondary-400 px-2 pt-1 !text-[#5D9ADC]">
      <Button
        type="text"
        icon={<XIcon className="h-4 w-4" />}
        className="self-end !text-[#5D9ADC]"
        onClick={() => setOpen(false)}
      />
      <p className="px-2 text-base font-medium">
        Global banking for future-proof businesses
      </p>
      <div className="grid place-items-center">
        <img
          src="/images/sidebar-banner.png"
          alt="banner"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Sidebar;
