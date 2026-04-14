'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest', param: 'sorting' },
  { label: 'Recently updated', value: 'recently-updated', param: 'sorting' },
  { label: 'Most viewed', value: 'most-viewed', param: 'sorting' },
  { label: 'A → Z', value: 'az', param: 'ordering' },
  { label: 'Z → A', value: 'za', param: 'ordering' },
];

export default function FilterAndSortOptions() {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentSorting = searchParams?.get('sorting') ?? '';
  const currentOrdering = searchParams?.get('ordering') ?? '';

  const activeOption = SORT_OPTIONS.find(
    (o) =>
      (o.param === 'sorting' && o.value === currentSorting) ||
      (o.param === 'ordering' && o.value === currentOrdering),
  );

  const handleSelect = (option: (typeof SORT_OPTIONS)[0]) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');

    params.delete('sorting');
    params.delete('ordering');
    params.delete('page');

    params.set(option.param, option.value);

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.delete('sorting');
    params.delete('ordering');
    params.delete('page');
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-800"
      >
        <ArrowUpDown className="h-4 w-4" />
        {activeOption ? activeOption.label : 'Sort'}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 z-20 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
          <div className="py-1">
            {SORT_OPTIONS.map((option) => {
              const isActive =
                (option.param === 'sorting' && option.value === currentSorting) ||
                (option.param === 'ordering' && option.value === currentOrdering);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                    isActive
                      ? 'font-semibold text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
            {activeOption && (
              <>
                <div className="my-1 border-t border-gray-100 dark:border-neutral-700" />
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  Clear sort
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}