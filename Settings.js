import React, { useState } from 'react';

const Settings = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(prev => !prev);
  };

  return (
    <div className="relative p-4">
      <button
        onClick={togglePopup}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Settings
      </button>

      {showPopup && (
        <div className="absolute top-16 right-4 bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-64 z-10">
          <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
          <p className="text-sm text-gray-700">Here you can configure your preferences.</p>
        </div>
      )}
    </div>
  );
};

export default Settings;
