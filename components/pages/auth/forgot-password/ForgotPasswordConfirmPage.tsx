'use client';

import { useSearchParams } from 'next/navigation';
import NewPasswordForm from '@/components/forms/NewPasswordForm';

export default function ForgotPasswordConfirmPage() {
  const params = useSearchParams();
  const uid = params.get('uid');
  const token = params.get('token');
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="dark:text-dm-txt mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Change your password
        </h2>
        <div className="mt-10 space-y-2">
          <NewPasswordForm uid={uid} token={token} />
        </div>
      </div>
    </div>
  );
}
