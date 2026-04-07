export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <nav className="mx-auto hidden b border-black dark:border-white max-w-full border-b px-6 py-4 md:static md:block md:overflow-y-visible lg:px-8">
      {children}
    </nav>
  );
}
