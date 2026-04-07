'use client';
import { RootState } from '@/redux/reducers';
import { updateProfileSchema } from '@/schemas/auth';
import { Profile } from '@/types/auth/profile';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ToastError, ToastSuccess, ToastWarning } from '@/components/toast/alerts';
import EditURL from '@/components/forms/EditURL';
import { Button } from '@/components/ui/Button';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import RichTextField from '@/components/forms/EditRichText';
import { loadProfileAction } from '@/redux/actions/auth/actions';
import EditDate from '@/components/forms/EditDate';
import EditImage from '@/components/forms/EditImage';
import useProfilePicture from '@/hooks/useProfilePicture';
import useBannerPicture from '@/hooks/useBannerPicture';

type UserProfileFormData = z.infer<typeof updateProfileSchema>;

const ProfileInfo = () => {
  const profile = useSelector((state: RootState) => state.auth.profile) as Profile;

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  const {
    profilePicture,
    setProfilePicture,
    percentage: profilePercentage,
    hasChanges: hasChangesProfile,
    onLoad: onLoadProfile,
    handleSave: handleSaveProfile,
  } = useProfilePicture(profile);

  const {
    bannerPicture,
    setBannerPicture,
    percentage: bannerPercentage,
    hasChanges: hasChangesBanner,
    onLoad: onLoadBanner,
    handleSave: handleSaveBanner,
  } = useBannerPicture(profile);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormData>({
    defaultValues: {
      bio: profile?.bio ?? '',
      instagram: profile?.instagram ?? '',
      linkedin: profile?.linkedin ?? '',
      birthday: profile?.birthday ?? '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (formData: UserProfileFormData) => {
    if (!profile) {
      ToastError('User not found');
      return;
    }

    const updatedData: Partial<UserProfileFormData> = {};

    if (formData.bio !== profile.bio) updatedData.bio = formData.bio;
    if (formData.instagram !== profile.instagram) updatedData.instagram = formData.instagram;
    if (formData.linkedin !== profile.linkedin) updatedData.linkedin = formData.linkedin;
    if (formData.birthday !== profile.birthday) updatedData.birthday = formData.birthday;

    const hasFieldChanges = Object.keys(updatedData).length > 0;

    if (!hasFieldChanges && !hasChangesProfile && !hasChangesBanner) {
      ToastWarning('No changes to save.');
      return;
    }

    try {
      if (hasChangesProfile) await handleSaveProfile();
      if (hasChangesBanner) await handleSaveBanner();

      if (hasFieldChanges) {
        const response = await fetch('/api/auth/profile/', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(updatedData),
        });

        const data = await response.json();

        if (response.ok) {
          ToastSuccess('Profile data updated successfully');
        } else {
          ToastError(data?.error || 'Failed to update profile data');
        }
      }

      await dispatch(loadProfileAction());
    } catch {
      ToastError('An error occurred while updating profile data');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mt-4 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-4 ml-4">
          <h3 className="text-base font-semibold text-gray-900">Profile</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your public profile information to let the world know more about you.
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
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Profile Picture
          </div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditImage
              data={profilePicture}
              setData={setProfilePicture}
              onLoad={onLoadProfile}
              percentage={profilePercentage}
              variant="profile"
              title="Profile Picture"
            />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Banner</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditImage
              data={bannerPicture}
              setData={setBannerPicture}
              onLoad={onLoadBanner}
              percentage={bannerPercentage}
              variant="banner"
              title="Banner"
            />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Biography</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <RichTextField name="bio" control={control} error={errors.bio?.message} />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Birthday</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditDate
              register={register('birthday')}
              error={errors.birthday?.message}
              title="Birthday"
              useTime={false}
            />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Instagram</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditURL register={register('instagram')} error={errors.instagram?.message} />
          </div>
        </div>

        <div className="pt-6 sm:flex sm:items-center">
          <div className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">LinkedIn</div>
          <div className="mt-1 sm:mt-0 sm:flex-auto">
            <EditURL register={register('linkedin')} error={errors.linkedin?.message} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
