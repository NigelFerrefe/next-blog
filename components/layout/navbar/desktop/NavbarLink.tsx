import hoverClasses from '@/utils/styles/hoverClass';
import Link from 'next/link';

interface ComponentProps {
  children: React.ReactNode;
  href?: string;
  useHover?: boolean;
  onClick?: () => void;
}

export default function NavbarLink({
  children,
  href = '/',
  useHover = true,
  onClick,
}: ComponentProps) {
  return (
    <Link href={href} onClick={onClick} className="inline-flex items-center">
      <div className={useHover ? hoverClasses : ''}>{children}</div>
    </Link>
  );
}