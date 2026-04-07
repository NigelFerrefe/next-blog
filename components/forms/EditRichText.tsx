'use client';

import { useController, Control, FieldValues, Path } from 'react-hook-form';
import inputFormClassName from '@/utils/styles/inputFormClass';
import Tiptap from '../ui/tiptap/TipTapEditor';

interface EditRichTextProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: string;
  required?: boolean;
  title?: string;
  description?: string;
  maxTextLength?: number;
}

export default function EditRichText<T extends FieldValues>({
  name,
  control,
  error,
  required = false,
  title = '',
  description = '',
  maxTextLength = 1200,
}: EditRichTextProps<T>) {
  const { field } = useController({ name, control });

  return (
    <div>
      <label className="dark:text-dm-txt block text-sm font-bold text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <p className="dark:text-dm-txt-secondary mb-2 text-sm text-gray-500">{description}</p>

      <div className={`${inputFormClassName} relative p-2`}>
        <Tiptap
          data={field.value ?? ''}
          setData={field.onChange}
          maxTextLength={maxTextLength}
        />
      </div>

      <p className="mt-1 min-h-[1.25rem] text-sm text-red-500">{error ?? '\u00A0'}</p>
    </div>
  );
}