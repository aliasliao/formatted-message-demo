import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import ReactJSON from 'react-json-view'
import 'tiptap/styles.css'
import { Toolbar } from 'tiptap/Toolbar'

enum Tab {
  EDITOR = 'EDITOR',
  JSON = 'JSON',
  TEXT = 'TEXT',
  HTML = 'HTML',
}

export const Editor = ({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content:
      'this is <strong>bold</strong>, this is <em>italic</em>, this is <strong><em>bold italic</em></strong></p><ul><li><p>bullet list one</p></li><li><p>bullet list two</p></li></ul><ol><li><p>ordered list one</p></li><li><p>ordered list two</p></li></ol>',
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'flex-grow overflow-auto outline-none',
      },
    },
    onCreate: ({ editor }) => setContent({
      html: editor.getHTML(),
      json: editor.getJSON(),
      text: editor.getText(),
    }),
    onUpdate: ({ editor }) => setContent({
      html: editor.getHTML(),
      json: editor.getJSON(),
      text: editor.getText(),
    }),
  }, [])

  const [content, setContent] = useState<{ html: string, json: any, text: string }>()
  const [tab, setTab] = useState<Tab>(Tab.EDITOR)

  const handleSend = () => {
    if (!editor) {
      return
    }
    setMessages((messages) => [
      ...messages, {
        id: Math.random().toString(36).substring(2),
        ...content!,
      },
    ])
  }

  const handleClear = () => {
    setMessages([])
  }

  if (!editor) {
    return null
  }
  return (
    <div
      className="flex flex-col flex-shrink-0 divide-y divide-gray-300"
      style={{ height: 360 }}
    >
      <>
        {tab === Tab.EDITOR && (
          <>
            <Toolbar editor={editor} />
            <EditorContent
              className="flex flex-grow overflow-hidden px-4 py-2"
              editor={editor}
            />
          </>
        )}
        {[Tab.TEXT, Tab.HTML].map((t) => (
          t === tab && (
            <code
              key={t}
              className="flex flex-grow px-4 py-2 whitespace-pre overflow-auto"
            >
              {(content as any)?.[t.toLowerCase()]}
            </code>
          )
        ))}
        {tab === Tab.JSON && (
          <div key={tab} className="flex flex-grow px-4 py-2 overflow-auto">
            <ReactJSON
              src={content?.json}
              collapsed={1}
              indentWidth={2}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              quotesOnKeys={false}
            />
          </div>
        )}
      </>
      <div className="h-12 flex-shrink-0 flex items-center justify-end px-8 space-x-4">
        <div className="space-x-1">
          {[Tab.EDITOR, Tab.TEXT, Tab.JSON, Tab.HTML].map((t) => (
            <button
              key={t}
              className={clsx('bg-white border-2 px-2 py-1 hover:text-blue-300 transition duration-200', { 'text-blue-300': t === tab })}
              onClick={() => setTab(t)}
            >{t}</button>
          ))}
        </div>
        <div className="flex-grow" />
        <button
          className="bg-white text-blue-500 border-2 px-3 py-1 hover:bg-gray-200 hover:text-blue-300 transition duration-200"
          onClick={handleClear}
        >
          Clear Messages
        </button>
        <button
          className="bg-white text-blue-500 border-2 px-3 py-1 hover:bg-gray-200 hover:text-blue-300 transition duration-200"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}
