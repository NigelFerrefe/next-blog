'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/auth';
import { z } from 'zod';
import EditText from '@/components/forms/EditText';
import EditEmail from '@/components/forms/EditEmail';
import EditPassword from '@/components/forms/EditPassword';
import { Button } from '@/components/ui/Button';

import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { IRegisterProps } from '@/redux/actions/auth/interfaces';
import { registerAction } from '@/redux/actions/auth/actions';
import LoadingMoon from '../loaders/LoadingMoon';
import { useRouter } from 'next/navigation';

type FormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    console.log('Register data:', data);
    const registerData: IRegisterProps = {
      email: data.email,
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      re_password: data.rePassword,
    };
    try {
      await dispatch(registerAction(registerData));
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <EditEmail
        register={register('email')}
        error={errors.email?.message}
        title="Email"
        required
      />

      <EditText
        register={register('username')}
        error={errors.username?.message}
        title="Username"
        placeholder="Username ..."
        required
        maxTextLength={40}
      />

      <EditText
        register={register('firstName')}
        error={errors.firstName?.message}
        title="First Name"
        placeholder="First name..."
        required
      />

      <EditText
        register={register('lastName')}
        error={errors.lastName?.message}
        title="Last Name"
        placeholder="Last name"
        required
      />

      <EditPassword
        register={register('password')}
        error={errors.password?.message}
        title="Password"
        description="Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
        required
        maxTextLength={32}
      />

      <EditPassword
        register={register('rePassword')}
        error={errors.rePassword?.message}
        title="Repeat Password"
        required
        maxTextLength={32}
      />

      <Button type="submit" hoverEffect={isSubmitting} disabled={!isValid}>
        {isSubmitting ? <LoadingMoon /> : 'Register'}
      </Button>
    </form>
  );
}
