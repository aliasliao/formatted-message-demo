import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import React from 'react'

export const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="h-8 flex flex-shrink-0 items-center px-4 space-x-4">
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={clsx('hover:text-blue-400 transition duration-200', {
        'text-blue-400': editor.isActive('bold'),
      })}
    >
      Bold
    </button>
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={clsx('hover:text-blue-400 transition duration-200', {
        'text-blue-400': editor.isActive('italic'),
      })}
    >
      Italic
    </button>
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={clsx('hover:text-blue-400 transition duration-200', {
        'text-blue-400': editor.isActive('bulletList'),
      })}
    >
      BulletList
    </button>
    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={clsx('hover:text-blue-400 transition duration-200', {
        'text-blue-400': editor.isActive('orderedList'),
      })}
    >
      OrderedList
    </button>
    <button
      onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      className="hover:text-blue-400 transition duration-200"
    >
      ClearFormat
    </button>
  </div>
)
