'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth';
import { z } from 'zod';
import EditEmail from '@/components/forms/EditEmail';
import EditPassword from '@/components/forms/EditPassword';
import { Button } from '@/components/ui/Button';

import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { ILoginProps } from '@/redux/actions/auth/interfaces';
import { loginAction } from '@/redux/actions/auth/actions';
import LoadingMoon from '../loaders/LoadingMoon';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    console.log('Register data:', data);
    const registerData: ILoginProps = {
      email: data.email,
      password: data.password,
    };
    try {
      await dispatch(loginAction(registerData));
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <EditEmail register={register('email')} error={errors.email?.message} title="Email" />

      <EditPassword
        register={register('password')}
        error={errors.password?.message}
        title="Password"
        maxTextLength={32}
      />

      <Button type="submit" hoverEffect={isSubmitting} disabled={!isValid}>
        {isSubmitting ? <LoadingMoon /> : 'Log in'}
      </Button>
    </form>
  );
}
