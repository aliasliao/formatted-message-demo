import React from "react";
import { useEffect, useRef } from "react";

const MessageListItem = ({ message: { id, text, html, json } }: any) => {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    element.current?.scrollIntoView?.();
  }, []);
  return (
    <div key={id} className="message pt-4" ref={element}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export const MessageList = ({ messages }: any) => (
  <div className="flex-grow flex overflow-hidden p-4">
    <div className="flex-grow flex-shrink overflow-auto">
      <div className="flex flex-col space-y-4 divide-y divide-gray-200">
        {messages.map((message: any) => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  </div>
);
