'use client';

import inputClassName from '@/utils/styles/inputClass';
import inputFormClassName from '@/utils/styles/inputFormClass';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

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

export default function EditPassword({
  register,
  error,
  required = false,
  disabled = false,
  maxTextLength = 32,
  placeholder = '',
  title = '',
  description = '',
}: ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label className="dark:text-dm-txt block text-sm font-bold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <p className="dark:text-dm-txt-secondary mb-2 text-sm text-gray-500">{description}</p>

      <div className={inputFormClassName}>
        <input
          type={showPassword ? 'text' : 'password'}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxTextLength}
          className={inputClassName}
          {...register}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">{error ?? '\u00A0'}</p>
    </div>
  );
}
