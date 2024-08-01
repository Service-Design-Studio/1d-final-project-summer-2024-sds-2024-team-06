// import React, { useRef } from 'react';
// import CanvasDraw from 'react-canvas-draw';
// import axios from 'axios';

// const DrawingBoard = () => {
//   const saveableCanvas = useRef(null);
//   const handleSave = () => {
//     const dataURL = saveableCanvas.current.getDataURL();
//     fetch(dataURL)
//     .then(res => res.blob())
//     .then(blob => {
//         const formData = new FormData();
//         formData.append('image', blob, 'drawing.png');
//         formData.append('journal_title', 'My Journal Title');
//         formData.append('journal_entry', 'This is my journal entry.');
//         formData.append('tip_title', 'My Tip Title');
//         formData.append('tip_body', 'This is my tip body.');
//         formData.append('date_created', new Date().toISOString().split('T')[0]);

//     axios.post('/api/echoes_journals', formData)
//     .then(response => {
//         console.log('Image saved:', response.data);
//     })
//     .catch(error => {
//         console.error('Error saving image:', error);
//     });
// });
// }



//   return (
//     <div>
//       <CanvasDraw ref={saveableCanvas} />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default DrawingBoard;


import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import './DrawingBoard.css';
import axios from 'axios';

const DrawingBoard = () => {
  const saveableCanvas = useRef(null);
  const [brushRadius, setBrushRadius] = useState(4);
  const [brushColor, setBrushColor] = useState('#000000');
  const [prompt, setPrompt] = useState('');

  const handleSave = () => {
    const dataURL = saveableCanvas.current.getDataURL();
    fetch(dataURL)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'drawing.png');
        formData.append('journal_title', 'My Journal Title');
        formData.append('journal_entry', prompt);
        formData.append('tip_title', 'My Tip Title');
        formData.append('tip_body', 'This is my tip body.');
        formData.append('date_created', new Date().toISOString().split('T')[0]);

        axios.post('/api/echoes_journals', formData)
          .then(response => {
            console.log('Image saved:', response.data);
          })
          .catch(error => {
            console.error('Error saving image:', error);
          });
      });
  };

  return (
    <div className="drawing-app">
      <div className="toolbar left">
        <h3>Brush Size</h3>
        <input
          type="range"
          min="1"
          max="10"
          value={brushRadius}
          onChange={(e) => setBrushRadius(parseInt(e.target.value))}
        />
      </div>

      <div className="toolbar right">
        <h3>Brush Color</h3>
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
        />
      </div>

      <div className="canvas-container">
        <CanvasDraw
          ref={saveableCanvas}
          brushRadius={brushRadius}
          brushColor={brushColor}
        />
      </div>

      <div className="prompt-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your journal entry..."
        />
        <button onClick={handleSave}>Save Drawing</button>
      </div>
    </div>
  );
};

export default DrawingBoard;
