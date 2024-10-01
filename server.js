const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const app = express();

const DATA_FILE = './studentData.json';

app.use(bodyParser.json());
app.use(express.static('public'));  // serve HTML and JS

// Load existing data or initialize empty array
let studentData = [];
if (fs.existsSync(DATA_FILE)) {
    studentData = JSON.parse(fs.readFileSync(DATA_FILE));
}

// Endpoint to submit student data
app.post('/submit', (req, res) => {
    const student = req.body;
    studentData.push(student);
    // Persist the data to a file
    fs.writeFileSync(DATA_FILE, JSON.stringify(studentData, null, 2));
    res.json({ message: 'Student data saved!' });
});

// Endpoint to download data as Excel
app.get('/download-excel', (req, res) => {
    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(studentData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Write workbook to buffer
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Send the buffer as a file to download
    res.setHeader('Content-Disposition', 'attachment; filename="studentData.xlsx"');
    res.send(buffer);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
