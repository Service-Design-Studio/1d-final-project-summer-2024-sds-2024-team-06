


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtPieceList() {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/art_pieces')
      .then(response => {
        console.log(response.data);
        setArtPieces(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

  return (
    artPieces
    // <div>
    //   {artPieces.map(artPiece => (
    //     <div key={artPiece.id}>
    //       {/* Render art piece details here */}
    //       <p>{artPiece.title}</p>
    //       <p>{artPiece.artist}</p>
    //       {/* Add more details as needed */}
    //     </div>
    //   ))}
    // </div>
  );
}

export default ArtPieceList;

