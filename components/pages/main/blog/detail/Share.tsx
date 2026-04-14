'use client';

import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Share2, ChevronDownIcon } from 'lucide-react';
import { usePostShare } from '@/hooks/usePostsShare';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type SharePlatform = 'facebook' | 'x' | 'linkedin' | 'whatsapp' | 'other';

type Props = {
  slug: string;
};

const shareOptions: { label: string; value: SharePlatform }[] = [
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'X', value: 'x' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Copiar enlace', value: 'other' },
];

const ShareButton = ({ slug }: Props) => {
  const { share } = usePostShare(slug);

  const handleShare = async (platform: SharePlatform) => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedUrl}`, '_blank', 'noopener,noreferrer');
        break;
      case 'x':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}`,
          '_blank',
          'noopener,noreferrer',
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          '_blank',
          'noopener,noreferrer',
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          '_blank',
          'noopener,noreferrer',
        );
        break;
      case 'other':
        await navigator.clipboard.writeText(url);
        break;
    }

    share.mutate(platform);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex h-9 items-center text-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
        <Share2 className="h-5 w-5" />
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
        <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-900">
          <div className="py-1">
            {shareOptions.map((option) => (
              <MenuItem key={option.value}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => handleShare(option.value)}
                    disabled={share.isPending}
                    className={classNames(
                      focus
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-700 dark:text-gray-200',
                      'block w-full px-4 py-2 text-left text-sm disabled:opacity-50',
                    )}
                  >
                    {option.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default ShareButton;
