import React, { useState } from "react";
import "./XmlPopup.css";

function XmlPopup({ content, onClose, onRefresh }) {
  const [parentTag, setParentTag] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tagValue, setTagValue] = useState("");

  const handleAddTag = async () => {
    if (!parentTag || !newTag || !tagValue) {
      alert("Please provide all inputs (parent tag, new tag, and value).");
      return;
    }

    // Step 1: Parse the XML content
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "application/xml");

    // Step 2: Find the parent element based on the input parentTag
    const parentElement = xmlDoc.querySelector(parentTag);
    if (!parentElement) {
      alert(`Parent tag <${parentTag}> not found.`);
      return;
    }

    // Step 3: Create the new tag with the provided value
    const newElement = xmlDoc.createElement(newTag);
    newElement.textContent = tagValue;

    // Step 4: Append the new tag inside the parent element
    parentElement.appendChild(newElement);

    // Step 5: Serialize the updated XML
    const serializer = new XMLSerializer();
    const updatedXml = serializer.serializeToString(xmlDoc);

    // Step 6: Send the updated XML back to the backend to write to file
    try {
      const response = await fetch("http://localhost:5000/api/update-xml", {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: updatedXml,  // Send the updated XML as a string
      });

      if (response.ok) {
        console.log("XML file updated successfully!");
        onRefresh(updatedXml);  // Refresh the content in the parent component
      } else {
        console.error("Failed to update the XML file.");
      }
    } catch (err) {
      console.error("Error sending updated XML:", err);
    }

    // Clear the inputs after submission
    setParentTag("");
    setNewTag("");
    setTagValue("");
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <pre>{content}</pre>
        <div className="input-group">
          <input
            type="text"
            placeholder="Parent Tag"
            value={parentTag}
            onChange={(e) => setParentTag(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tag Value"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button onClick={onClose}>Close</button>
          <button onClick={handleAddTag}>Add Tag</button>
        </div>
      </div>
    </div>
  );
}

export default XmlPopup;


