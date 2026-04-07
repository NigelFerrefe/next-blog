import React from 'react';
import DesktopNavbar from './desktop/index';
import MobileNavbar from './mobile';

export default function Navbar() {
  return <div className="z-10 w-full lg:overflow-y-visible">
    <DesktopNavbar />
    <MobileNavbar />
  </div>;
}
