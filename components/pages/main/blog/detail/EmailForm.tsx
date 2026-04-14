'use client';

import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import EditEmail from '@/components/forms/EditEmail';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { newsletterSubscribeSchema } from '@/schemas/newsletter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSignup } from '@/utils/api/newsletter';
import axios from 'axios';

type FormData = z.infer<typeof newsletterSubscribeSchema>;

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(newsletterSubscribeSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await newsletterSignup({ email: data.email });
      ToastSuccess('Successfully subscribed!');
      reset()
    } catch (err) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.detail ?? err.response?.data?.error ?? 'Failed to subscribe';
      ToastError(message);
    } else {
      ToastError('Failed to subscribe, please try again.');
    }
  }
  };

  return (
    <div className="w-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditEmail register={register('email')} error={errors.email?.message} title="Email" />
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full scale-100 rounded-lg bg-black py-3 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
        >
          {isSubmitting ? <LoadingMoon /> : 'Join our newsletter'}
        </button>
      </form>
    </div>
  );
}
