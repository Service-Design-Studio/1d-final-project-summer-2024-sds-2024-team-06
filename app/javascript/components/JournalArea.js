import React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export default function JournalArea() {

  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(body)
  }

  const getToast = () => {
    toast("Session ended", {
      description: "Journal saved!"
    })
  }

  return (
    <div>
    <form onSubmit={handleSubmit} id="text-box"> 
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write down your thoughts..." className="w-full h-3/4 bg-transparent"/>
        <div className="flex justify-end">
        <Link to={`/gallery-walk`}>
          <button id="end-activity" className="px-4 py-2 bg-gray-800 text-white rounded" onClick={getToast}>End session</button>
        </Link>
        </div>
    </form>
    </div>
  )
}
