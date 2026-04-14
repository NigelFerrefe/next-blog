'use client';

import { useRouter } from 'next/navigation';

interface InfoStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
}

export default function InfoState({
  title,
  description,
  buttonText = 'Volver atrás',
  href,
  onClick,
}: InfoStateProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (href) {
      router.push(href);
      return;
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="max-w-xl rounded-lg border border-neutral-200 p-8 text-center shadow-sm dark:border-neutral-800">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}

        <div className="mt-8">
          <button
            onClick={handleClick}
            className="rounded-md bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}