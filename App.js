// import React from "react";
// import Add from "./Add";
// // import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <Add></Add>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import XMLViewer from './XMLViewer';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setShowPopup(true)} style={{ padding: '10px 20px' }}>
        Open XML Editor
      </button>

      {showPopup && (
        <div>
          <XMLViewer closePopup={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
