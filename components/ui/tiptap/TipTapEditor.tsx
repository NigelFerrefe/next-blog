'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Toolbar from './Toolbar';

export interface TipTapEditorProps {
  data: string;
  setData: (value: string) => void;
  maxTextLength: number;
}

const Tiptap = ({ data, setData, maxTextLength }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data,
    autofocus: false,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap prose max-w-none w-full px-1 py-2 focus:outline-none',
      },
    },
    onCreate: ({ editor }) => {
      editor.commands.blur();
    },
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      setData(updatedContent);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHtml = editor.getHTML();

    if (currentHtml !== data) {
      if (!data) {
        editor.commands.clearContent();
      } else {
        editor.commands.setContent(data);
      }
    }
  }, [data, editor]);

  return (
    <div>
      <Toolbar editor={editor} maxTextLength={maxTextLength} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
