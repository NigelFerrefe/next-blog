'use client';

import ForgotPasswordForm from '../../../forms/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="dark mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Form */}
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
