'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';

import LoadingMoon from '@/components/loaders/LoadingMoon';
import { Button } from '@/components/ui/Button';
import { ToastError, ToastSuccess, ToastWarning } from '@/components/toast/alerts';

import { RootState } from '@/redux/reducers';
import { load_user } from '@/redux/actions/auth/actions';
import { UserSecurity } from '@/types/auth/user';

import { z } from 'zod';
import { changePasswordSchema } from '@/schemas/auth';
import EditPassword from '@/components/forms/EditPassword';

type UserSecurityInfoFormData = z.infer<typeof changePasswordSchema>;

const SecurityInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user) as UserSecurity;
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSecurityInfoFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      re_new_password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset({
        current_password: user.current_password ?? '',
        new_password: user.new_password ?? '',
        re_new_password: user.re_new_password ?? '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData: UserSecurityInfoFormData) => {
    if (!user) {
      ToastError('User not found');
      return;
    }

    const updatedData: Partial<UserSecurityInfoFormData> = {};

    if (formData.current_password !== user.current_password) {
      updatedData.current_password = formData.current_password;
    }

    if (formData.new_password !== user.new_password) {
      updatedData.new_password = formData.new_password;
    }

    if (formData.re_new_password !== user.re_new_password) {
      updatedData.re_new_password = formData.re_new_password;
    }

    if (Object.keys(updatedData).length === 0) {
      ToastWarning('No changes to save.');
      return;
    }

    try {
      const response = await fetch('/api/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        ToastSuccess('User password updated successfully');
        await dispatch(load_user());
      } else {
        ToastError(data?.error || 'Failed to update user password');
      }
    } catch {
      ToastError('An error occurred while updating user password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mt-4 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-4 ml-4">
          <h3 className="text-base font-semibold text-gray-900">Change Your Password</h3>
        </div>

        <div className="mt-4 ml-4 shrink-0">
          <Button type="submit" style={{ width: '150px' }} disabled={isSubmitting} hoverEffect>
            {isSubmitting ? <LoadingMoon /> : 'Save Password'}
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Current Password
          </div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditPassword
              register={register('current_password')}
              error={errors.current_password?.message}
              maxTextLength={32}
            />
          </div>
        </div>
        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">New Password</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditPassword
              register={register('new_password')}
              error={errors.new_password?.message}
              description="Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
              maxTextLength={32}
            />
          </div>
        </div>
        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Confirm New Password
          </div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditPassword
              register={register('re_new_password')}
              error={errors.re_new_password?.message}
              maxTextLength={32}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SecurityInfo;
