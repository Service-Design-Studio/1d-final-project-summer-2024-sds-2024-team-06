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
      

        
      </form>

      
    </div>
  );
}