import Quill from 'quill'
import 'quilljs/styles.css'
import React, { useEffect, useRef, useState } from 'react'

let editor: Quill | null = null

export const Editor = ({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!editorRef.current || !toolbarRef.current) {
      return
    }
    editor = new Quill(editorRef.current, {
      debug: 'info',
      modules: {
        toolbar: toolbarRef.current,
      },
      formats: ['bold', 'italic', 'list'],
    })
    editor.on('text-change', () => {
      setContent({
        text: editor!.getText(),
        json: editor!.getContents(),
        html: editor!.root.innerHTML,
      })
    })
  }, [])
  const [content, setContent] = useState<{ text: string, json: any, html: string }>()

  const handleClear = () => setMessages([])

  const handleSend = () => {
    setMessages((messages) => [
      ...messages, {
        id: Math.random().toString(36).substring(2),
        ...content!,
      },
    ])
  }

  return (
    <div
      className="flex flex-col flex-shrink-0 divide-y divide-gray-300"
      style={{ height: 360 }}
    >
      <div ref={toolbarRef} className="h-8 flex flex-shrink-0 items-center px-4 space-x-4">
        <button className="ql-bold hover:text-blue-400 transition duration-200">Bold</button>
        <button className="ql-italic hover:text-blue-400 transition duration-200">Italic</button>
        <button className="ql-list hover:text-blue-400 transition duration-200" value="bullet">BulletList</button>
        <button className="ql-list hover:text-blue-400 transition duration-200" value="ordered">OrderedList</button>
      </div>
      <div ref={editorRef} className="flex flex-grow overflow-hidden px-4 py-2" />
      <div className="h-12 flex-shrink-0 flex items-center justify-end px-8 space-x-4">
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
