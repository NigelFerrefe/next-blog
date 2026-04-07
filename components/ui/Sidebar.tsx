'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUser, Fingerprint } from 'lucide-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const pathname = usePathname();

  const secondaryNavigation = [
    {
      name: 'Information',
      href: '/profile',
      icon: CircleUser,
    },
    {
      name: 'Security',
      href: '/profile/security',
      icon: Fingerprint,
    },
    // { name: 'Notifications', href: '#', icon: BellIcon, current: false },
    // { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
    // { name: 'Friends', href: '#', icon: UsersIcon, current: false },
  ];

  return (
    <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
      <nav className="flex-none px-4 sm:px-6 lg:px-0">
        <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          {secondaryNavigation.map((item) => {
            const current = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold',
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                      'size-6 shrink-0',
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
