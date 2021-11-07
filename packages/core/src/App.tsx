import React from 'react'
import Panel from 'tiptap/Panel'
import './styles.css'

export default function App() {

  return (
    <div className="App flex justify-center items-center">
      <div className="background" />
      <div
        className="w-4/5 h-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-gray-100"
      >
        <Panel />
      </div>
    </div>
  )
}
