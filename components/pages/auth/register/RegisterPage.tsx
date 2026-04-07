'use client';

import RegisterForm from '@/components/forms/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="dark:text-dm-txt mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register and start now
        </h2>
      </div>

      <div className="dark mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Form */}
        <RegisterForm />

        <div className="mt-10 space-y-2">
          <p className="text-center text-sm/6 text-gray-500">
            Do not received activation email?
            <Link
              href="/resend-activation"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              resend email
            </Link>
          </p>
          <p className="text-center text-sm/6 text-gray-500">
            Do you have an account?
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
