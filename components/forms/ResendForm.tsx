'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResendSchema } from '@/schemas/auth';
import { z } from 'zod';
import EditEmail from '@/components/forms/EditEmail';
import { Button } from '@/components/ui/Button';

import { IResendProps } from '@/redux/actions/auth/interfaces';
import { resendAction } from '@/redux/actions/auth/actions';
import LoadingMoon from '../loaders/LoadingMoon';

type FormData = z.infer<typeof ResendSchema>;

export default function ResendForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ResendSchema),
    mode: 'onBlur',
  });


  const onSubmit = async (data: FormData) => {
    const resendData: IResendProps = {
      email: data.email,
    };

    await resendAction(resendData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <EditEmail
        register={register('email')}
        error={errors.email?.message}
        title="Email"
      
      />

      <Button type="submit" hoverEffect={isSubmitting} disabled={!isValid || isSubmitting} >
        {isSubmitting ? <LoadingMoon /> : 'Resend activation email'}
      </Button>
    </form>
  );
}
