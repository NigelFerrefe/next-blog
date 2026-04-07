'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';

import LoadingMoon from '@/components/loaders/LoadingMoon';
import { Button } from '@/components/ui/Button';
import EditText from '@/components/forms/EditText';
import { ToastError, ToastSuccess, ToastWarning } from '@/components/toast/alerts';

import { RootState } from '@/redux/reducers';
import { load_user } from '@/redux/actions/auth/actions';
import { User } from '@/types/auth/user';

import { z } from 'zod';
import { updateUserSchema } from '@/schemas/auth';

type UserInfoFormData = z.infer<typeof updateUserSchema>;

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData: UserInfoFormData) => {
    if (!user) {
      ToastError('User not found');
      return;
    }

    const updatedData: Partial<UserInfoFormData> = {};

    if (formData.username !== user.username) {
      updatedData.username = formData.username;
    }

    if (formData.first_name !== user.first_name) {
      updatedData.first_name = formData.first_name;
    }

    if (formData.last_name !== user.last_name) {
      updatedData.last_name = formData.last_name;
    }

    if (Object.keys(updatedData).length === 0) {
      ToastWarning('No changes to save.');
      return;
    }

    try {
      const response = await fetch('/api/auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        ToastSuccess('User data updated successfully');
        await dispatch(load_user());
      } else {
        ToastError(data?.error || 'Failed to update user data');
      }
    } catch {
      ToastError('An error occurred while updating user data');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mt-4 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-4 ml-4">
          <h3 className="text-base font-semibold text-gray-900">User Information</h3>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="mt-4 ml-4 shrink-0">
          <Button type="submit" style={{ width: '150px' }} disabled={isSubmitting} hoverEffect>
            {isSubmitting ? <LoadingMoon /> : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditText
              register={register('username')}
              error={errors.username?.message}
              placeholder="Enter your username"
              maxTextLength={20}
            />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">First Name</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditText
              register={register('first_name')}
              error={errors.first_name?.message}
              placeholder="Enter your first name"
              maxTextLength={40}
            />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Last Name</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditText
              register={register('last_name')}
              error={errors.last_name?.message}
              placeholder="Enter your last name"
              maxTextLength={40}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserInfo;