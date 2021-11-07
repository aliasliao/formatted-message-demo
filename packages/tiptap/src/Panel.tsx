import React, { useState } from 'react'
import { Editor } from 'tiptap/Editor'
import { MessageList } from 'tiptap/MessageList'

export default () => {
  const [messages, setMessages] = useState<Message[]>([])

  return (
    <div className="w-fill h-full flex flex-col divide-y divide-gray-300">
      <MessageList messages={messages} />
      <Editor setMessages={setMessages} />
    </div>
  )
}
