'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import slugify from 'react-slugify';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import CategoryListItem from './CategoryListItem';
import { ICategory } from '@/types/blog/category';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ComponentProps {
  categories: ICategory[];
}

export default function CategoriesList({ categories }: ComponentProps) {
  return (
    <>
      <div className="sm:hidden">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full items-center justify-center gap-x-1.5 text-sm font-bold text-white">
            Categorías
            <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <MenuItems className="absolute top-full left-0 z-20 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-dm-accent shadow-lg ring-1 ring-black/5 focus:outline-none">
              {' '}
              <div className="py-1">
                {categories.map((category) => {
                  const categorySlug = slugify(category.slug);

                  return (
                    <MenuItem key={category.slug}>
                      {({ focus }) => (
                        <Link
                          href={`/category/${categorySlug}`}
                          className={classNames(
                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          {category.name}
                        </Link>
                      )}
                    </MenuItem>
                  );
                })}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-neutral-400 hover:scrollbar-thumb-neutral-500 scrollbar-track-transparent hidden items-center gap-6 overflow-x-auto pb-2 whitespace-nowrap sm:flex">
        {categories.map((category) => (
          <CategoryListItem key={category.slug} category={category} />
        ))}
      </div>
    </>
  );
}
