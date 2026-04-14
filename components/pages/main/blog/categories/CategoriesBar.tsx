'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import CategoriesList from './CategoriesList';
import { Search, X } from 'lucide-react';
import { useCategoriesList } from '@/hooks/useCategories';

export default function CategoriesBar() {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const [searchBy, setSearchBy] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories = [], isLoading } = useCategoriesList();

  const sanitizeInput = (input: string) =>
    input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBy(sanitizeInput(event.target.value));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = searchBy.trim();

    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (trimmedValue) {
      params.set('search', trimmedValue);
    } else {
      params.delete('search');
    }
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
    collapseContainer();
  };

  const expandContainer = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapseContainer = useCallback(() => {
    setIsExpanded(false);
    setSearchBy('');
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    inputRef.current?.focus();
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        collapseContainer();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapseContainer]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        expandContainer();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        collapseContainer();
      }
    };

    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, [expandContainer, collapseContainer]);

  return (
    <div
      ref={containerRef}
      className="border-t border-white/10 bg-dm-second backdrop-blur dark:bg-dm-third"
    >
      {isExpanded ? (
        <form
          onSubmit={handleSearch}
          className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 md:px-6"
        >
          <input
            ref={inputRef}
            type="text"
            name="searchBy"
            value={searchBy}
            onChange={handleChange}
            placeholder="Buscar posts..."
            className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={collapseContainer}
            aria-label="Cerrar búsqueda"
            className="shrink-0"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </form>
      ) : (
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-20 px-4 md:px-6">
          <button
            onClick={expandContainer}
            type="button"
            aria-label="Abrir búsqueda"
            className="shrink-0 text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1 text-white">
            {isLoading ? (
              <LoadingMoon color="#fff" size={20} />
            ) : (
              <CategoriesList categories={categories} />
            )}
          </div>
          <div className="w-5 shrink-0" />
        </div>
      )}
    </div>
  );
}