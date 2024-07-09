import React, { createContext, useContext, useState, useEffect } from "react"

const User = createContext();
export const useUser = () => useContext(User);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
        fetch('/api/current_user', {
          credentials: 'include' // Necessary for cookies to be sent if using session-based authentication
        })
        .then(response => response.json())
        .then((data) => {setCurrentUser(data)
          console.log('Current user:', data);
        })
        .catch(error => console.error('Error:', error));
      }, []);
  
    return (
      <User.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </User.Provider>
    );
  };