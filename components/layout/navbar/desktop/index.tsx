'use client';

import Image from 'next/image';
import AuthLinks from '../auth/AuthLinks';
import GuestLinks from '../guest/GuestLinks';
import Container from './Container';
import Header from './Header';
import NavbarLink from './NavbarLink';
import RightMenuContainer from './RightMenuContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';

export default function DesktopNavbar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Container>
      <Header>
        <div className="flex w-full items-center">
          {/* Left */}
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

          {/* Center */}
          <div className="flex flex-1 justify-center space-x-5">
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/contact">Contact</NavbarLink>
          </div>

          {/* Right */}
          <RightMenuContainer>
            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
          </RightMenuContainer>
        </div>
      </Header>
    </Container>
  );
}
