'use client';

import { useState } from 'react';
import axios from 'axios';
import { ImageValue, ISelectedImage } from '@/types/media/media';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { getSignedUrlForImage } from '@/utils/api/gcs/GetSignedUrl';
import { Profile } from '@/types/auth/profile';

export default function useBannerPicture(profile: Profile | null) {
  const [bannerPicture, setBannerPicture] = useState<ImageValue>(
    profile?.banner_picture ?? null
  );
  const [percentage, setPercentage] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const isSelectedImage = (value: ImageValue): value is ISelectedImage =>
    !!value && 'file' in value;

  const onLoad = (newImage: ImageValue) => {
    setBannerPicture(newImage);
    setHasChanges(true);
  };

  const handleSave = async (): Promise<boolean> => {
    if (!bannerPicture || !isSelectedImage(bannerPicture) || !profile) {
      ToastError('No file selected for upload');
      return false;
    }

    const { file, title } = bannerPicture;
    const { size, type } = file;

    try {
      const signedData = await getSignedUrlForImage(file, 'banner', String(profile.id));

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
        ToastError('Error uploading banner image to GCS');
        return false;
      }

      const backendResponse = await fetch('/api/media/upload_banner_picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ key: signedData.key, title, size: String(size), type }),
      });

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        ToastError(data?.error || 'Failed to save banner picture');
        return false;
      }

      setPercentage(0);
      setHasChanges(false);
      ToastSuccess('Banner picture updated successfully');
      return true;
    } catch {
      ToastError('Error uploading banner image');
      return false;
    }
  };

  return {
    bannerPicture,
    setBannerPicture,
    percentage,
    hasChanges,
    onLoad,
    handleSave,
  };
}