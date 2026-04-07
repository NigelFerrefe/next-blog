'use client';

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
} from 'lucide-react';
import { type Editor } from '@tiptap/react';
import { LucideIcon } from 'lucide-react';

interface ComponentProps {
  editor: Editor | null;
  maxTextLength: number;
}

interface ToggleButtonConfig {
  key: string;
  icon: LucideIcon;
  isActive: () => boolean;
  onClick: () => void;
}

interface ActionButtonConfig {
  key: string;
  icon: LucideIcon;
  canRun: () => boolean;
  onClick: () => void;
}

export default function Toolbar({ editor, maxTextLength }: ComponentProps) {
  if (!editor) return null;

  const currentTextLength = editor.getText().length;

  const baseButtonClass =
    'rounded-xl border p-2 transition-colors duration-200';
  const activeButtonClass =
    'border-green-600 bg-green-500 text-white hover:bg-green-500';
  const inactiveButtonClass =
    'border-gray-300 hover:bg-gray-100';
  const disabledButtonClass =
    'cursor-not-allowed border-gray-200 text-gray-400 opacity-50';

  const toggleButtons: ToggleButtonConfig[] = [
    {
      key: 'bold',
      icon: Bold,
      isActive: () => editor.isActive('bold'),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      key: 'italic',
      icon: Italic,
      isActive: () => editor.isActive('italic'),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      key: 'underline',
      icon: Underline,
      isActive: () => editor.isActive('underline'),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      key: 'strike',
      icon: Strikethrough,
      isActive: () => editor.isActive('strike'),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      key: 'heading2',
      icon: Heading2,
      isActive: () => editor.isActive('heading', { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: 'bulletList',
      icon: List,
      isActive: () => editor.isActive('bulletList'),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      key: 'orderedList',
      icon: ListOrdered,
      isActive: () => editor.isActive('orderedList'),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      key: 'blockquote',
      icon: Quote,
      isActive: () => editor.isActive('blockquote'),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      key: 'codeBlock',
      icon: Code,
      isActive: () => editor.isActive('codeBlock'),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
  ];

  const actionButtons: ActionButtonConfig[] = [
    {
      key: 'undo',
      icon: Undo,
      canRun: () => editor.can().undo(),
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      key: 'redo',
      icon: Redo,
      canRun: () => editor.chain().focus().redo().run(),
      onClick: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        {toggleButtons.map(({ key, icon: Icon, isActive, onClick }) => (
          <button
            key={key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
            className={`${baseButtonClass} ${
              isActive() ? activeButtonClass : inactiveButtonClass
            }`}
          >
            <Icon className="h-5 w-auto" />
          </button>
        ))}

        {actionButtons.map(({ key, icon: Icon, canRun, onClick }) => {
          const enabled = canRun();

          return (
            <button
              key={key}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!enabled) return;
                onClick();
              }}
              className={`${baseButtonClass} ${
                enabled ? inactiveButtonClass : disabledButtonClass
              }`}
              disabled={!enabled}
            >
              <Icon className="h-5 w-auto" />
            </button>
          );
        })}
      </div>

      {maxTextLength && (
        <span className="ml-auto text-sm text-gray-500">
          {currentTextLength} of {maxTextLength}
        </span>
      )}
    </div>
  );
}