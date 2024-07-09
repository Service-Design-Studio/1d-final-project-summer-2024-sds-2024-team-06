import React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function JournalArea() {
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    console.log("hello")
    e.preventDefault(); // Prevents the default form submission behavior

    const journalData = {
      journalentry: body,
    };

    fetch(`/api/journals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ journal: journalData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Journal created:', data);
      getToast();
      navigate('/gallery-walk'); // Navigate to another page
    })
    .catch((error) => {
      console.error('Error creating Journal:', error);
    });
    console.log(body);    
  }

  const getToast = () => {
    toast("Session ended", {
      description: "Journal saved!"
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="text-box">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write down your thoughts..."
          className="w-full h-3/4 bg-transparent"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            id="end-activity"
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            End session
          </button>
        </div>
      </form>
    </div>
  );
}