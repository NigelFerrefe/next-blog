import { ICategory } from '@/types/blog/category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import slugify from 'react-slugify';

interface ComponentProps {
  category: ICategory;
}

export default function CategoryListItem({ category }: ComponentProps) {
  const pathname = usePathname();
  const categorySlug = slugify(category?.slug);

  const isActive = pathname === `/category/${categorySlug}`;

  return (
    <Link
      href={`/category/${categorySlug}`}
      className={`dark:hover:text-dm-accent text-sm font-black hover:underline hover:underline-offset-4 ${
        isActive ? 'underline underline-offset-4' : ''
      }`}
    >
      {category?.name}
    </Link>
  );
}