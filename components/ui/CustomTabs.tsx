'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React from 'react';

interface ComponentProps {
  titles: string[];
  panels: React.ReactNode[];
  width?: string;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CustomTabs({ titles, panels, width = 'md:w-32 w-full' }: ComponentProps) {
  function getTabClassName(selected: boolean) {
    return classNames(
      `flex items-center justify-center col-span-1 ${width} rounded`,
      selected
        ? 'bg-gray-100 focus:outline-none dark:bg-dm-second'
        : 'hover:bg-gray-100 dark:hover:bg-dm-second',
    );
  }

  return (
    <TabGroup>
      <TabList className="grid space-y-1 space-x-1 sm:flex sm:space-y-0 sm:space-x-2">
        {titles.map((title) => (
          <Tab key={title} className={({ selected }) => getTabClassName(selected)}>
            {title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {panels.map((panel, index) => {
          const key = (panel as any)?.key ?? index;
          return <TabPanel key={key}>{panel}</TabPanel>;
        })}
      </TabPanels>
    </TabGroup>
  );
}
