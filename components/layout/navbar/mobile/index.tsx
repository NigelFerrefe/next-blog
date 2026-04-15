'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavbarLink from '../desktop/NavbarLink';
import Container from './Container';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { logoutAction } from '@/redux/actions/auth/actions';
import { useRouter } from 'next/navigation';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const router = useRouter();

  // Cierra el menú si se hace resize a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logoutAction());
    setIsOpen(false);
    router.push('/');
  };

  const close = () => setIsOpen(false);

  const avatarSrc =
    profile?.profile_picture?.url ||
    'https://storage.googleapis.com/ferrefe-blog-app-bucket/media/profiles/default/user-icon-placeholder.png';

  return (
    <Container>
      {/* Barra superior */}
      <div className="flex w-full items-center justify-between px-8 py-3">
        {/* Logo */}
        <NavbarLink useHover={false}>
          <Image
            src="/assets/logo.svg"
            className="h-10 w-auto rounded-md"
            width={512}
            height={512}
            priority
            alt="Home"
          />
        </NavbarLink>

        {/* Botón burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="dark:bg-dm-txt flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm" onClick={close} />
      )}

      {/* Drawer */}
      <div
        className={`dark:bg-dm-bg fixed top-0 right-0 z-50 h-full w-72 transform bg-gray-200 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="dark:text-dm-txt-secondary text-sm font-medium text-gray-500">Menu</span>
          <button
            onClick={close}
            className="text-dm-txt-secondary transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links de navegación */}
        <nav className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4">
          <Link
            href="/blog"
            onClick={close}
            className="dark:text-dm-txt-secondary rounded-md px-3 py-2.5 font-medium text-gray-700 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={close}
            className="dark:text-dm-txt-secondary rounded-md px-3 py-2.5 font-medium text-gray-700 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Auth section */}
        <div className="px-5 py-4">
          {isAuthenticated ? (
            <div className="flex flex-col gap-1">
              {/* Info del usuario */}
              <div className="mb-2 flex items-center gap-3 px-3 py-3">
                <Image
                  className="h-9 w-9 rounded-full object-cover"
                  src={avatarSrc}
                  width={36}
                  height={36}
                  alt="profile-picture"
                />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user?.username}</p>
                </div>
              </div>

              {user?.username && (
                <Link
                  href={`/public-profile/${user.username}`}
                  onClick={close}
                  className="dark:text-dm-txt-secondary rounded-md px-3 py-2.5 font-medium text-gray-700 transition-colors"
                >
                  Public Profile
                </Link>
              )}
              <Link
                href="/profile"
                onClick={close}
                className="dark:text-dm-txt-secondary rounded-md px-3 py-2.5 font-medium text-gray-700 transition-colors"
              >
                Account settings
              </Link>

              <button
                onClick={handleLogout}
                className="text-md block w-full px-3 py-2 text-left text-red-800 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={close}
                className="bg-dm-accent dark:bg-dm-primary w-full rounded-md px-4 py-2.5 text-center text-sm font-medium text-gray-900 transition-colors dark:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={close}
                className="dark:bg-dm-txt dark:text-dm-main w-full rounded-md bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
