import React from 'react'
import { useState } from 'react'

export default function DisplayTrack() {

  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(body)
  }

  return (
    <div>
    <form onSubmit={handleSubmit}> 
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write down your thoughts" className="w-full h-3/4 bg-transparent"/>
        <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-800 text-white rounded">End session</button>
        </div>
    </form>
    </div>
  )
}
