'use client'


import inputClassName from '@/utils/styles/inputClass';
import inputFormClassName from '@/utils/styles/inputFormClass';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ComponentProps {
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxTextLength?: number;
  placeholder?: string;
  title?: string;
  description?: string;
}

export default function EditEmail({
  register,
  error,
  required = false,
  disabled = false,
  maxTextLength = 120,
  placeholder = '',
  title = '',
  description = '',
}: ComponentProps) {
  return (
    <div>
      <label className="dark:text-dm-txt block text-sm font-bold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </label>

      <p className="dark:text-dm-txt-secondary mb-2 text-sm text-gray-500">{description}</p>

      <div className={inputFormClassName}>
        <input
          type="email"
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxTextLength}
          className={inputClassName}
          {...register}
        />
      </div>

      <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">{error ?? '\u00A0'}</p>
    </div>
  );
}
