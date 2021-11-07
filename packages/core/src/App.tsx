import clsx from 'clsx'
import React, { useState } from 'react'
import './styles.css'

const Tab = {
  TipTap: {
    name: 'TipTap',
    Comp: React.lazy(() => import('tiptap/Panel')),
  },
  QuillJs: {
    name: 'QuillJs',
    Comp: React.lazy(() => import('quilljs/Panel')),
  },
} as const

const Tabs = ({ tab, setTab }: any) => (
  <div className="flex flex-col divide-y-2 divide-gray-200 absolute top-0 left-full">
    {Object.keys(Tab).map(t => (
      <button
        key={t}
        className={clsx(
          'px-3 py-2 bg-gray-100 hover:bg-gray-100 hover:text-blue-300 ',
          t === tab ? 'bg-opacity-100 text-blue-300' : 'bg-opacity-50',
        )}
        onClick={() => setTab(t)}
      >
        {t}
      </button>
    ))}
  </div>
)

export default function App() {
  const [tab, setTab] = useState<keyof typeof Tab>(Tab.TipTap.name)
  const { Comp } = Tab[tab]

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="background" />
      <div
        className="w-4/5 h-5/6 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-gray-100 relative"
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <Comp />
        </React.Suspense>
        <Tabs tab={tab} setTab={setTab} />
      </div>
    </div>
  )
}
