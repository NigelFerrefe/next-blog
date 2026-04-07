'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendOTPSchema, verifyOTPSchema } from '@/schemas/auth';
import { z } from 'zod';
import EditEmail from '@/components/forms/EditEmail';
import EditText from '@/components/forms/EditText';
import { Button } from '@/components/ui/Button';
import LoadingMoon from '../loaders/LoadingMoon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { useRouter } from 'next/navigation';
import { sendOTPLogin } from '@/utils/api/auth/sendOTPLogin';
import { verifyOTPLogin } from '@/utils/api/auth/verifyOTPLogin';
import { loadProfileAction, load_user, setLoginSuccessAction } from '@/redux/actions/auth/actions';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';

type SendOTPFormData = z.infer<typeof sendOTPSchema>;
type VerifyOTPFormData = z.infer<typeof verifyOTPSchema>;

export default function LoginOTPForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const sendForm = useForm<SendOTPFormData>({
    resolver: zodResolver(sendOTPSchema),
    mode: 'onBlur',
  });

  const verifyForm = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    mode: 'onBlur',
  });

  const onSendOTP = async (data: SendOTPFormData) => {
    try {
      const res = await sendOTPLogin({ email: data.email });
      if (res.status === 200) {
        setEmail(data.email);
        setStep(2);
      } else {
        ToastError('Error sending OTP, please try again.');
      }
    } catch (err) {
      console.error(err);
      ToastError('Something went wrong.');
    }
  };

  const onVerifyOTP = async (data: VerifyOTPFormData) => {
    try {
      const res = await verifyOTPLogin({ email, otp: data.otp });
      if (res.status === 200) {
        await dispatch(loadProfileAction());
        await dispatch(load_user());
        await dispatch(setLoginSuccessAction());
        ToastSuccess('Login successful.');
        router.push('/');
      } else {
        ToastError('Invalid OTP code, please try again.');
      }
    } catch (err) {
      console.error(err);
      ToastError('Something went wrong.');
    }
  };

  if (step === 1) {
    return (
      <form onSubmit={sendForm.handleSubmit(onSendOTP)} className="flex flex-col gap-4">
        <EditEmail
          register={sendForm.register('email')}
          error={sendForm.formState.errors.email?.message}
          title="Email"
        />
        <Button
          type="submit"
          hoverEffect={sendForm.formState.isSubmitting}
          disabled={!sendForm.formState.isValid}
        >
          {sendForm.formState.isSubmitting ? <LoadingMoon /> : 'Send OTP'}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={verifyForm.handleSubmit(onVerifyOTP)} className="flex flex-col gap-4">
      <EditText
        register={verifyForm.register('otp')}
        error={verifyForm.formState.errors.otp?.message}
        title="OTP Code"
      />
      <Button
        type="submit"
        hoverEffect={verifyForm.formState.isSubmitting}
        disabled={!verifyForm.formState.isValid}
      >
        {verifyForm.formState.isSubmitting ? <LoadingMoon /> : 'Verify OTP'}
      </Button>
      <button
        type="button"
        className="text-sm text-gray-500 hover:text-gray-700"
        onClick={() => setStep(1)}
      >
        ← Back
      </button>
    </form>
  );
}