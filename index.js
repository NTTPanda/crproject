// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



// import express from "express";
// import fs from "fs";
// import path from "path";
// import cors from "cors";
// import bodyParser from "body-parser";  // Import body-parser for handling raw text input

// const app = express();
// const PORT = 5000;

// // Define global XML path relative to current working directory
// const XML_FILE_PATH = path.resolve("./My_XML/my.xml");

// app.use(cors());
// app.use(bodyParser.text({ type: "application/xml" }));  // Parse raw XML as text

// // Endpoint to get XML content
// app.get("/api/xml", (req, res) => {
//   fs.readFile(XML_FILE_PATH, "utf-8", (err, data) => {
//     if (err) {
//       console.error("Failed to read XML file:", err);
//       return res.status(500).send("Error reading XML file");
//     }
//     res.type("application/xml").send(data);
//   });
// });

// // Endpoint to handle updating XML content
// app.post("/api/update-xml", (req, res) => {
//   const updatedXml = req.body;

//   // Ensure the updatedXml is a string before writing it to the file
//   if (typeof updatedXml !== 'string') {
//     return res.status(400).send("Invalid XML format");
//   }

//   fs.writeFile(XML_FILE_PATH, updatedXml, "utf-8", (err) => {
//     if (err) {
//       console.error("Failed to write XML file:", err);
//       return res.status(500).send("Error writing XML file");
//     }
//     res.status(200).send("XML file updated successfully");
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const xmlFile = path.resolve("./My_XML/my.xml");

const parser = new XMLParser({
  ignoreDeclaration: true,  // Ignore XML declaration when parsing
});
const builder = new XMLBuilder({
  ignoreAttributes: false,
  format: true,
  indentBy: '  ',
  suppressEmptyNode: true,
});

app.get('/api/xml', (req, res) => {
  try {
    const xmlData = fs.readFileSync(xmlFile, 'utf-8');
    const jsonObj = parser.parse(xmlData);
    res.json(jsonObj);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read XML' });
  }
});

app.post('/api/save', (req, res) => {
  try {
    const updatedJson = req.body;
    const updatedXml = builder.build(updatedJson);

    // Write XML declaration manually if you want, else skip
    const finalXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${updatedXml}`;

    fs.writeFileSync(xmlFile, finalXml, 'utf-8');
    res.json({ message: 'XML saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save XML' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
