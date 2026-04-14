'use client';

import { IHeading } from '@/types/blog/heading';
import { useCallback, useEffect, useState } from 'react';

export default function TableOfContents({ headings }: { headings: IHeading[] }) {
  const [activeSlug, setActiveSlug] = useState('');
  const NAVBAR_HEIGHT = 80;

  const updateActiveHeading = useCallback(() => {
    let closestHeadingSlug = '';
    let closestHeadingDistance = Number.POSITIVE_INFINITY;

    for (const heading of headings) {
      const element = document.getElementById(heading.slug);
      if (!element) continue;

      const distance = element.getBoundingClientRect().top - NAVBAR_HEIGHT;
      const absDistance = Math.abs(distance);

      if (absDistance < closestHeadingDistance) {
        closestHeadingDistance = absDistance;
        closestHeadingSlug = heading.slug;
      }
    }

    setActiveSlug((prev) => (prev === closestHeadingSlug ? prev : closestHeadingSlug));
  }, [headings]);

  useEffect(() => {
    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveHeading);
  }, [updateActiveHeading]);

  const scrollToSection = useCallback((slug: string) => {
    const section = document.getElementById(slug);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <nav className="col-span-5 m-2 rounded p-6" aria-label="Table of contents">
      <h2 className="mb-2 text-xl">Table of contents</h2>
      <ul className="dark:divide-dm-border divide-y">
        {headings.map((heading) => {
          const isActive = activeSlug === heading.slug;
          return (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => scrollToSection(heading.slug)}
                className={`dark:text-dm-txt w-full cursor-pointer py-2.5 text-left text-sm text-gray-500 dark:hover:text-violet-400 ${
                  isActive ? 'font-bold text-[#2181e2] dark:text-violet-400' : ''
                }`}
              >
                {heading.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}