'use client';

import { logoutAction } from '@/redux/actions/auth/actions';
import { RootState } from '@/redux/reducers';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export default function AuthLinks() {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push('/');
  };

  const avatarSrc =
    profile?.profile_picture?.url ||
    'https://storage.googleapis.com/ferrefe-blog-app-bucket/media/profiles/default/user-icon-placeholder.png';

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left ">
        <MenuButton>
          <Image
            className="h-10 w-auto"
            src={avatarSrc}
            width={512}
            height={512}
            alt="profile-picture"
          />
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
        >
          <div className="px-4 py-3">
            <p className="text-sm dark:text-gray-900">Signed in as:</p>
            <p className="truncate text-sm font-medium text-gray-900">{user?.username}</p>
          </div>
          <MenuItem>
            {user?.username && (
              <a
                href={`/public-profile/${user.username}`}
                className="block px-4 py-2 text-sm text-gray-700 data--focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
              >
                Public Profile
              </a>
            )}
          </MenuItem>
          <MenuItem>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Account settings
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleLogout}
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Sign out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
