'use client';

import ReactDropzone from 'react-dropzone';
import { Line } from 'rc-progress';
import Image from 'next/image';

import { ToastError } from '@/components/toast/alerts';
import { IMedia, ISelectedImage, ImageValue } from '@/types/media/media';

interface ComponentProps {
  data: ImageValue;
  setData: (value: ImageValue) => void;
  onLoad?: (value: ImageValue) => void;
  percentage?: number;
  variant?: 'profile' | 'banner' | 'normal';
  title?: string;
  description?: string;
}

export default function EditImage({
  data,
  setData,
  onLoad,
  percentage = 0,
  variant = 'profile',
  title = 'File',
  description = '',
}: ComponentProps) {
  const handleDrop = (acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];

    if (!acceptedFile) return;

    if (acceptedFile.size > 2 * 1024 * 1024) {
      ToastError('Image must be Max 2MB');
      return;
    }

    const allowedFileTypes = ['image/jpeg', 'image/png'];

    if (!allowedFileTypes.includes(acceptedFile.type)) {
      ToastError(
        `${acceptedFile.type} is not allowed. Only .jpg, .jpeg or .png extensions are allowed`
      );
      return;
    }

    const sizeInKB = acceptedFile.size / 1024;
    const fileTypeMapping: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
    };

    const newItem: ISelectedImage = {
      id: crypto.randomUUID(),
      title: acceptedFile.name,
      file: acceptedFile,
      size: `${sizeInKB.toFixed(2)} KB`,
      type: fileTypeMapping[acceptedFile.type] || acceptedFile.type,
      lastModified: acceptedFile.lastModified,
    };

    setData(newItem);

    if (onLoad) {
      onLoad(newItem);
    }
  };

  const isSelectedImage = (value: ImageValue): value is ISelectedImage => {
    return !!value && 'file' in value;
  };

  const isMedia = (value: ImageValue): value is IMedia => {
    return !!value && 'url' in value;
  };

  const getSrcUrl = () => {
    if (isMedia(data) && data.url) {
      return data.url;
    }

    if (isSelectedImage(data) && data.file) {
      return URL.createObjectURL(data.file);
    }

    return '/assets/img/placeholder/media.jpg';
  };

  const getFileLabel = () => {
    if (isSelectedImage(data)) {
      return data.title;
    }

    if (isMedia(data) && data.name) {
      return data.name;
    }

    return 'Drag and drop or click to upload file';
  };

  const srcUrl = getSrcUrl();


  const normalStyle = <div>Normal style</div>;

  const bannerStyle = (
    <div>
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>

      <div className="w-full">
        <div className="flex flex-col-reverse">
          <Image
            width={512}
            height={512}
            src={srcUrl}
            alt=""
            className="h-48 w-full object-cover"
            loading="lazy"
            
          />
        </div>
      </div>

      <div className="mt-2 w-full">
        <ReactDropzone onDrop={handleDrop} multiple={false} accept={{ 'image/jpeg': [], 'image/png': [] }}>
          {({ getRootProps, getInputProps }) => (
            <div
              className="form-control text-md dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary hover:dark:bg-dark-third m-0 block w-full flex-grow cursor-pointer rounded border-2 border-dashed border-gray-200 bg-white bg-clip-padding p-4 text-gray-700 transition ease-in-out hover:border-gray-300 hover:bg-gray-50 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <span>{getFileLabel()}</span>
            </div>
          )}
        </ReactDropzone>

        <div className="mt-2">
          <Line
            percent={percentage}
            strokeWidth={2}
            strokeColor={percentage < 70 ? '#e6007a' : '#b1fec5'}
          />
        </div>
      </div>
    </div>
  );



  const profileStyle = (
    <div>
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>

      <div className="flex flex-col items-center gap-2 md:flex-row">
        <div className="flex-shrink-0">
          <div className="aspect-w-0.5 aspect-h-0.5 w-32">
            <Image
              width={512}
              height={512}
              src={srcUrl}
              alt=""
              className="h-32 w-32 rounded-full object-cover object-center"
              loading='eager'
              
            />
          </div>
        </div>

        <div className="w-full">
          <ReactDropzone onDrop={handleDrop} multiple={false} accept={{ 'image/jpeg': [], 'image/png': [] }}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="form-control text-md dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary hover:dark:bg-dark-third m-0 block w-full flex-grow cursor-pointer rounded border-2 border-dashed border-gray-200 bg-white bg-clip-padding p-4 text-gray-700 transition ease-in-out hover:border-gray-300 hover:bg-gray-50 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <span>{getFileLabel()}</span>
              </div>
            )}
          </ReactDropzone>

          <div className="mt-2">
            <Line
              percent={percentage}
              strokeWidth={2}
              strokeColor={percentage < 70 ? '#e6007a' : '#b1fec5'}
            />
          </div>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'profile':
      return profileStyle;
    case 'normal':
      return normalStyle;
    case 'banner':
      return bannerStyle;
    default:
      return null;
  }
}