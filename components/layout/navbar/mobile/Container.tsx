export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <nav className="mx-auto block max-w-full border-b md:hidden">{children}</nav>;
}
