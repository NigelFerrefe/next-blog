'use client';

import { ToastError } from '@/components/toast/alerts';
import { Button } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { IActivationProps } from '@/redux/actions/auth/interfaces';
import { activateAction } from '@/redux/actions/auth/actions';
import { useState } from 'react';
import LoadingMoon from '@/components/loaders/LoadingMoon';

export default function ActivatePage() {
  const params = useSearchParams();
  const uid = params.get('uid');
  const token = params.get('token');

  const [loading, setLoading] = useState(false);
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const handleSubmit = async () => {
    if (!uid || !token) {
      ToastError('Token and UID must be provided');
      return;
    }

    const activationData: IActivationProps = {
      uid,
      token,
    };

    try {
      setLoading(true);
      await dispatch(activateAction(activationData));
    } catch (error) {
      console.log(error);
      ToastError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="dark:text-dm-txt mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Activate your account
        </h2>
    <div className="mt-10 space-y-2">

        <Button type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? <LoadingMoon /> : 'Activate'}
        </Button>
    </div>
      </div>
    </div>
  );
}