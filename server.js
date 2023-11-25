const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3001;

// Setup Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/api/upload', upload.single('photo'), (req, res) => {
  // Handle file upload
  const file = req.file; // Access the uploaded file
  res.status(200).json({ message: 'File uploaded successfully.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
