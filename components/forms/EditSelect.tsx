'use client';

import inputClassName from '@/utils/styles/inputClass';
import inputFormClassName from '@/utils/styles/inputFormClass';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface ComponentProps {
  register: UseFormRegisterReturn;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  title?: string;
  description?: string;
}

export default function EditSelect({
  register,
  options,
  error,
  required = false,
  disabled = false,
  placeholder = 'Selecciona una opción',
  title = '',
  description = '',
}: ComponentProps) {
  return (
    <div>
      <label className="dark:text-dm-txt block text-sm font-bold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </label>

      <p className="dark:text-dm-txt-secondary mb-2 text-sm text-gray-500">
        {description}
      </p>

      <div className={inputFormClassName}>
        <select
          required={required}
          disabled={disabled}
          className={inputClassName}
          defaultValue=""
          {...register}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">
        {error ?? '\u00A0'}
      </p>
    </div>
  );
}