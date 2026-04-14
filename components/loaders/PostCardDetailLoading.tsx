'use client';

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-neutral-800 ${className}`} />;
}

export default function LoadingPostDetailPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl space-y-12 px-6 py-24">
        <div className="mx-auto w-full space-y-4 text-center">
          <SkeletonBlock className="mx-auto h-4 w-28" />
          <SkeletonBlock className="mx-auto h-12 w-3/4 max-w-2xl" />
          <SkeletonBlock className="mx-auto h-4 w-56" />
        </div>
      </section>

      <div className="block lg:relative lg:flex lg:flex-wrap">
        <aside className="mx-auto hidden w-full max-w-3xl px-8 lg:sticky lg:top-0 lg:block lg:h-full lg:w-1/4 lg:max-w-none lg:px-0">
          <div className="m-2 rounded p-6">
            <SkeletonBlock className="mb-4 h-7 w-40" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>
        </aside>

        <div className="mx-auto w-full max-w-3xl px-8 leading-7 text-gray-700 lg:w-2/2 lg:px-2 xl:w-1/2">
          <article className="mx-auto w-full max-w-3xl px-8">
            <SkeletonBlock className="mt-6 h-7 w-5/6" />

            <div className="mt-10 space-y-4">
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-11/12" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-10/12" />
              <SkeletonBlock className="mt-8 h-64 w-full rounded-xl" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-9/12" />
            </div>
          </article>
        </div>

        <aside className="hidden w-full xl:sticky xl:top-0 xl:flex xl:h-full xl:w-1/4">
          <div className="m-2 w-full rounded bg-gray-100 p-6 dark:bg-neutral-900">
            <SkeletonBlock className="mb-4 h-6 w-6" />
            <SkeletonBlock className="h-8 w-40" />
            <div className="mt-4 space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-11/12" />
              <SkeletonBlock className="h-10 w-full rounded-md" />
              <SkeletonBlock className="h-10 w-full rounded-md" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-10/12" />
            </div>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <SkeletonBlock className="mb-8 h-8 w-52" />
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 md:max-w-none md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonBlock className="h-52 w-full rounded-xl" />
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-6 w-5/6" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-10/12" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}