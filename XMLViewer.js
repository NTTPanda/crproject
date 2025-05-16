import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'

const parseKeyValue = (str) => {
  const [key, ...rest] = str.split(':');
  return { key, value: rest.join(':') };
};

const updateValueByPath = (obj, path, newValue) => {
  const lastKey = path[path.length - 1];
  const parent = path.slice(0, -1).reduce((acc, key) => acc[key], obj);
  parent[lastKey] = newValue;
};

const RenderNode = ({ node, path, setJson, json }) => {
  if (typeof node === 'string') {
    const { key, value } = parseKeyValue(node);

    return (
      <div className="input-row">
        <label className="input-label">{key}</label>
        <input
          className="input-field"
          value={value}
          onChange={(e) => {
            const updatedStr = `${key}:${e.target.value}`;
            updateValueByPath(json, path, updatedStr);
            setJson({ ...json });
          }}
        />
      </div>
    );
  }

  if (Array.isArray(node)) {
    return node.map((item, index) => (
      <RenderNode
        key={index}
        node={item}
        path={[...path, index]}
        setJson={setJson}
        json={json}
      />
    ));
  }

  if (typeof node === 'object' && node !== null) {
    return Object.entries(node).map(([key, val], idx) => (
      <details key={idx} className="details" >
        <summary className="summary">{key}</summary>
        <RenderNode node={val} path={[...path, key]} setJson={setJson} json={json} />
      </details>
    ));
  }

  return null;
};

const XMLViewer = ({ closePopup }) => {
  const [json, setJson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/xml')
      .then((res) => {
        setJson(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = () => {
    axios.post('http://localhost:5000/api/save', json).then(() => {
      alert('XML saved successfully!');
      closePopup();
    });
  };

  if (loading) return <div className="loading">Loading XML data...</div>;
  if (!json) return <div className="error">Failed to load XML data.</div>;

  return (
    <div className="popup-container">
      <button onClick={closePopup} className="close-btn" aria-label="Close popup">
        ×
      </button>

      <h2 className="popup-title">Edit XML Data</h2>

      <div className="xml-content">
        <RenderNode node={json} path={[]} setJson={setJson} json={json} />
      </div>

      <button onClick={handleSave} className="save-btn">
        Save
      </button>
    </div>
  );
};

export default XMLViewer;



