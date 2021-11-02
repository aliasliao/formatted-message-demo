import React from "react";
import { useEditor, EditorContent, Editor as TEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import clsx from "clsx";

const getId = () => Math.random().toString(36).substring(2);

const Toolbar = ({ editor }: { editor: TEditor }) => (
  <div className="h-8 flex flex-shrink-0 items-center px-4 space-x-4">
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={clsx("hover:text-blue-400 transition duration-200", {
        "text-blue-400": editor.isActive("bold")
      })}
    >
      Bold
    </button>
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={clsx("hover:text-blue-400 transition duration-200", {
        "text-blue-400": editor.isActive("italic")
      })}
    >
      Italic
    </button>
    <button
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={clsx("hover:text-blue-400 transition duration-200", {
        "text-blue-400": editor.isActive("bulletList")
      })}
    >
      BulletList
    </button>
    <button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={clsx("hover:text-blue-400 transition duration-200", {
        "text-blue-400": editor.isActive("orderedList")
      })}
    >
      OrderedList
    </button>
  </div>
);

export const Editor = ({ setMessages }: any) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem
    ],
    content:
      "this is <strong>bold</strong>, this is <em>italic</em>, this is <strong><em>bold italic</em></strong></p><ul><li><p>bullet list one</p></li><li><p>bullet list two</p></li></ul><ol><li><p>ordered list one</p></li><li><p>ordered list two</p></li></ol>",
    editorProps: {
      attributes: {
        class: "flex-grow overflow-auto outline-none"
      }
    }
  });

  const handleSend = () => {
    if (!editor) {
      return;
    }
    setMessages((messages: any) => [
      ...messages,
      {
        id: getId(),
        html: editor.getHTML(),
        json: editor.getJSON(),
        text: editor.getText()
      }
    ]);
  };

  const handleClear = () => {
    setMessages([]);
  };

  if (!editor) {
    return null;
  }
  return (
    <div
      className="flex flex-col flex-shrink-0 divide-y divide-gray-300"
      style={{ height: 320 }}
    >
      <Toolbar editor={editor} />
      <EditorContent
        className="flex flex-grow overflow-hidden px-4 py-2"
        editor={editor}
      />
      <div className="h-12 flex-shrink-0 flex items-center justify-end px-8 space-x-4">
        <button
          className="bg-white text-blue-300 border-2 px-3 py-1 hover:bg-gray-200"
          onClick={handleClear}
        >
          clear
        </button>
        <button
          className="bg-white text-blue-300 border-2 px-3 py-1 hover:bg-gray-200"
          onClick={handleSend}
        >
          send
        </button>
      </div>
    </div>
  );
};
