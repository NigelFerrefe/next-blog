'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPasswordSchema } from '@/schemas/auth';
import { z } from 'zod';
import EditPassword from '@/components/forms/EditPassword';
import { Button } from '@/components/ui/Button';


import { forgotPasswordConfirmAction } from '@/redux/actions/auth/actions';
import LoadingMoon from '../loaders/LoadingMoon';
import { IForgotPasswordConfirmProps } from '@/redux/actions/auth/interfaces';

type FormData = z.infer<typeof newPasswordSchema>;
interface ComponentProps {
  readonly uid: string | null;
  readonly token: string | null;
}

export default function NewPasswordForm({ uid, token }: ComponentProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    console.log('Register data:', data);
    const registerData: IForgotPasswordConfirmProps = {
      new_password: data.new_password,
      re_new_password: data.re_new_password,
      uid: uid,
      token: token,
    };
    try {
      await forgotPasswordConfirmAction(registerData);
    } catch (err) {
      console.error(err);
    }
  };

  if (!uid || !token) {
    return (
      <div className="py-4 text-center text-sm text-red-500">Invalid or missing reset link.</div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <EditPassword
        register={register('new_password')}
        error={errors.new_password?.message}
        title="New Password"
        description="Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
        maxTextLength={32}
      />

      <EditPassword
        register={register('re_new_password')}
        error={errors.re_new_password?.message}
        title="Repeat New Password"
        maxTextLength={32}
      />

      <Button type="submit" hoverEffect={isSubmitting} disabled={!isValid ||isSubmitting}>
        {isSubmitting ? <LoadingMoon /> : 'Change Password'}
      </Button>
    </form>
  );
}
