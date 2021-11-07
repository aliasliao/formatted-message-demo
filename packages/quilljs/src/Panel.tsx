import { Editor } from 'quilljs/Editor'
import { MessageList } from 'quilljs/MessageList'
import React, { useState } from 'react'

export default () => {
  const [messages, setMessages] = useState<Message[]>([])

  return (
    <div className="w-fill h-full flex flex-col divide-y divide-gray-300">
      <MessageList messages={messages} />
      <Editor setMessages={setMessages} />
    </div>
  )
}
