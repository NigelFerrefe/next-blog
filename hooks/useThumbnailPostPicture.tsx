'use client';

import { useState } from 'react';
import axios from 'axios';
import { ImageValue, ISelectedImage } from '@/types/media/media';
import { ToastError } from '@/components/toast/alerts';
import { getSignedUrlForPostImage } from '@/utils/api/gcs/getSignefUrlForPostImage';

interface ThumbnailUploadResult {
  thumbnail_name: string;
  thumbnail_size: string;
  thumbnail_type: string;
  thumbnail_key: string;
}

export default function useThumbnailPostPicture() {
  const [thumbnailPicture, setThumbnailPicture] = useState<ImageValue>(null);
  const [percentage, setPercentage] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const isSelectedImage = (value: ImageValue): value is ISelectedImage =>
    !!value && 'file' in value;

  const onLoad = (newImage: ImageValue) => {
    setThumbnailPicture(newImage);
    setHasChanges(true);
  };

  const hasImage = !!thumbnailPicture;
  const clearImage = () => {
    setThumbnailPicture(null);
    setHasChanges(false);
    setPercentage(0);
  };

  const handleSave = async (
    slug?: string,
    username?: string,
  ): Promise<ThumbnailUploadResult | null> => {
    if (!thumbnailPicture || !isSelectedImage(thumbnailPicture)) {
      ToastError('No file selected for upload');
      return null;
    }

    const { file, title } = thumbnailPicture;
    const { size, type } = file;

    try {
      const signedData = await getSignedUrlForPostImage(file, slug || 'draft', username);

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
        ToastError('Error uploading thumbnail to GCS');
        return null;
      }

      setPercentage(0);
      setHasChanges(false);

      return {
        thumbnail_name: title,
        thumbnail_size: String(size),
        thumbnail_type: type,
        thumbnail_key: signedData.key,
      };
    } catch {
      ToastError('Error uploading thumbnail image');
      return null;
    }
  };

  return {
    thumbnailPicture,
    setThumbnailPicture,
    percentage,
    hasChanges,
    onLoad,
    handleSave,
    hasImage,
    clearImage,
  };
}
