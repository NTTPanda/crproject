import React, { useState } from "react";
import XmlPopup from "./XmlPopup";
import "./XmlPopup.css";

function Add() {
  const [showPopup, setShowPopup] = useState(false);
  const [xmlContent, setXmlContent] = useState("");

  const loadXML = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/xml");
      const text = await res.text();
      setXmlContent(text);
      setShowPopup(true);
    } catch (err) {
      console.error("Failed to load XML", err);
    }
  };

  const handleRefresh = (updatedXml) => {
    setXmlContent(updatedXml);
  };

  return (
    <div className="App">
      <button className="add-button" onClick={loadXML}>ADD NEW TAG</button>

      {showPopup && (
        <XmlPopup
          content={xmlContent}
          onClose={() => setShowPopup(false)}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}

export default Add;