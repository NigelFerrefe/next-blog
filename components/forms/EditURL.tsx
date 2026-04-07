'use client';

import inputClassName from '@/utils/styles/inputClass';
import inputFormClassName from '@/utils/styles/inputFormClass';
import { UseFormRegisterReturn } from 'react-hook-form';

interface EditUrlProps {
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  title?: string;
}

export default function EditURL({
  register,
  error,
  required = false,
  disabled = false,
  placeholder = '',
  title = '',
}: EditUrlProps) {
  return (
    <div className="w-full">
      <span className="dark:text-dm-txt mb-2 block text-sm font-bold text-gray-900">
        {title}
      </span>

      <div className={`${inputFormClassName}`}>
        <input
          type="url"
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`${inputClassName}`}
          {...register}
          aria-describedby="url-input"
        />
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}