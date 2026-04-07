'use client';

import { UseFormRegisterReturn } from 'react-hook-form';
import inputClassName from '@/utils/styles/inputClass';
import inputFormClassName from '@/utils/styles/inputFormClass';

interface EditDateProps {
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
  useTime?: boolean;
}

export default function EditDate({
  register,
  error,
  required = false,
  disabled = false,
  title = '',
  description = '',
  useTime = false,
}: EditDateProps) {
  return (
    <div>
      <label className="dark:text-dm-txt block text-sm font-bold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <p className="dark:text-dm-txt-secondary mb-2 text-sm text-gray-500">{description}</p>

      <div className={inputFormClassName}>
        <input
          type={useTime ? 'datetime-local' : 'date'}
          required={required}
          disabled={disabled}
          className={inputClassName}
          {...register}
        />
      </div>

      <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">{error ?? '\u00A0'}</p>
    </div>
  );
}