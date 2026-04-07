'use client';

import ResendForm from '@/components/forms/ResendForm';

export default function ResendPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="dark mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Form */}
        <ResendForm />
      </div>
    </div>
  );
}
