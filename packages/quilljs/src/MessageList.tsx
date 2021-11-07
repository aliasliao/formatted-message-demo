import React, { useEffect, useRef } from 'react'

const MessageListItem = ({ message: { id, text, html, json } }: { message: Message }) => {
  const element = useRef<HTMLDivElement>(null)
  useEffect(() => {
    element.current?.scrollIntoView?.()
  }, [])
  return (
    <div key={id} className="message pt-4" ref={element}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const MessageList = ({ messages }: { messages: Message[] }) => (
  <div className="flex-grow flex overflow-hidden p-4">
    <div className="flex-grow flex-shrink overflow-auto">
      <div className="flex flex-col space-y-4 divide-y divide-gray-200">
        {messages.map((message: Message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  </div>
)
