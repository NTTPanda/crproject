import React, { useState } from 'react';

const flatten = (obj, path = []) => {
  if (typeof obj === 'string') {
    const [label, value] = obj.split(':');
    return [{ path, label, value }];
  }
  let result = [];
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        result = result.concat(flatten(v, path.concat([key, i])));
      });
    } else {
      result = result.concat(flatten(value, path.concat(key)));
    }
  }
  return result;
};

const updateNested = (obj, path, newValue) => {
  if (path.length === 0) return newValue;
  const [key, ...rest] = path;
  if (Array.isArray(obj)) {
    const idx = parseInt(key, 10);
    return obj.map((item, i) =>
      i === idx ? updateNested(item, rest, newValue) : item
    );
  } else {
    return {
      ...obj,
      [key]: updateNested(obj[key], rest, newValue)
    };
  }
};

const Popup = ({ data, onClose, onSave }) => {
  const flat = flatten(data);
  const [formData, setFormData] = useState(flat);

  const handleChange = (index, newVal) => {
    const newFormData = [...formData];
    newFormData[index].value = newVal;
    setFormData(newFormData);
  };

  const handleSave = () => {
    let updated = data;
    formData.forEach(item => {
      updated = updateNested(updated, item.path, `${item.label}:${item.value}`);
    });
    onSave(updated);
  };

  return (
    <div style={{ position: 'fixed', top: 100, left: '20%', right: '20%', background: '#fff', border: '1px solid #ccc', padding: 20, zIndex: 100 }}>
      <h2>Edit XML</h2>
      {formData.map((item, index) => (
        <div key={index}>
          <label>{item.label}: </label>
          <input value={item.value} onChange={e => handleChange(index, e.target.value)} />
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup;
