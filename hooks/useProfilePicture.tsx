'use client';

import {  useState } from 'react';
import axios from 'axios';
import { ImageValue, ISelectedImage } from '@/types/media/media';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { getSignedUrlForImage } from '@/utils/api/gcs/GetSignedUrl';
import { Profile } from '@/types/auth/profile';

export default function useProfilePicture(profile: Profile | null) {
  const [profilePicture, setProfilePicture] = useState<ImageValue>(
    profile?.profile_picture ?? null
  );
  const [percentage, setPercentage] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);



  const isSelectedImage = (value: ImageValue): value is ISelectedImage =>
    !!value && 'file' in value;

  const onLoad = (newImage: ImageValue) => {
    setProfilePicture(newImage);
    setHasChanges(true);
  };

  const handleSave = async (): Promise<boolean> => {
    if (!profilePicture || !isSelectedImage(profilePicture) || !profile) {
      ToastError('No file selected for upload');
      return false;
    }

    const { file, title } = profilePicture;
    const { size, type } = file;

    try {
      const signedData = await getSignedUrlForImage(file, 'profile', String(profile.id));

      const uploadResponse = await axios.put(signedData.signedUrl, file, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const pct = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setPercentage(pct);
          }
        },
      });

      if (uploadResponse.status !== 200) {
        ToastError('Error uploading profile image to GCS');
        return false;
      }

      const backendResponse = await fetch('/api/media/upload_profile_picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ key: signedData.key, title, size: String(size), type }),
      });

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        ToastError(data?.error || 'Failed to save profile picture');
        return false;
      }

      setPercentage(0);
      setHasChanges(false);
      ToastSuccess('Profile picture updated successfully');
      return true;
    } catch {
      ToastError('Error uploading profile image');
      return false;
    }
  };

  return {
    profilePicture,
    setProfilePicture,
    percentage,
    hasChanges,
    onLoad,
    handleSave,
  };
}