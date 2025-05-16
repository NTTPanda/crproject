import express from "express";
import cors from "cors";
import fs from "fs";
import { parseString } from "xml2js";

const app = express();
app.use(cors());

app.get("/get-equipment", (req, res) => {
    // Read the XML file
    fs.readFile("./My_XML/my.xml", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading XML file:", err);
            return res.status(500).json({ error: "Failed to read XML file" });
        }
        // Parse XML data
        parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error("Error parsing XML:", parseErr);
                return res.status(500).json({ error: "Failed to parse XML" });
            }

            // Extract equipment details
            const equipmentArray = result.equipment_info.equipment.map((equipment) => ({
                name: equipment.name[0],
                model: equipment.model[0],
                class: equipment.class[0],
            }));

            // Send the extracted data as a response
            res.json(equipmentArray);
        });
    });
});

// Start the server
app.listen(600, () => console.log("App is Running on port 5000 ......."));

