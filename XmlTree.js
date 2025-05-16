import React from 'react';

const XmlTree = ({ data, level = 0 }) => {
  if (typeof data === 'string') {
    const [label, value] = data.split(':');
    return (
      <div style={{ marginLeft: level * 20 }}>
        <strong>{label}</strong>: {value}
      </div>
    );
  }

  return (
    <div style={{ marginLeft: level * 20 }}>
      {Object.entries(data).map(([key, value], i) => (
        <div key={i}>
          <details>
            <summary>{key}</summary>
            {Array.isArray(value)
              ? value.map((item, idx) => (
                  <XmlTree key={idx} data={item} level={level + 1} />
                ))
              : <XmlTree data={value} level={level + 1} />}
          </details>
        </div>
      ))}
    </div>
  );
};

export default XmlTree;
