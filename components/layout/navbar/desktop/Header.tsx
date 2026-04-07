import React from 'react';

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative mx-auto flex max-w-7xl justify-between items-center">{children}</div>;
}
