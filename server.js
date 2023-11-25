const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
// const ConnectionModel = require('./models/ConnectionModel');
const TextModel = require('./models/TextModel');
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


app.use((req, res, next) => {
    const connection = new ConnectionModel();
    connection.save();
    next();
  });
  
  // b. Receive text from the frontend and insert it into a model
  app.use(express.json());
  
  app.post('/api/text', (req, res) => {
    const { text } = req.body;
    const newText = new TextModel({ text });
    newText.save();
    res.status(200).json({ message: 'Text received and inserted.' });
  });
  
  // c. Call Django API using the most recent 2 strings and return ngrams to the frontend
  app.get('/api/ngrams', async (req, res) => {
    const recentTexts = await TextModel.find().sort({ _id: -1 }).limit(2);
    const [text1, text2] = recentTexts.map((text) => text.text);
  
    // Make API call to Django
    // You need to replace 'http://django-api-url' with the actual Django API endpoint
    // and implement the logic to handle the Django API response
    // (similar to what was explained in the previous response for Step 3)
    const djangoResponse = await axios.post('http://django-api-url', { text1, text2 });
  
    res.status(200).json({ ngrams: djangoResponse.data });
  });
  
  // d. Add the person's ID (A) to MongoDB
  app.post('/api/person', (req, res) => {
    const { personID } = req.body;
    // Assuming you have a PersonModel (similar to TextModel and ConnectionModel) defined
    // Implement the logic to save the personID in the PersonModel
    res.status(200).json({ message: 'Person ID added to MongoDB.' });
  });
  
  // e. Store the encrypted photo in a directory on the disk using Multer
  app.post('/api/photo', upload.single('photo'), (req, res) => {
    const { personID } = req.body;
    const encryptedPhotoPath = req.file.path;
    // Save the encrypted photo path along with personID in a model (e.g., PhotoModel)
    res.status(200).json({ message: 'Encrypted photo stored.' });
  });
  
  // f. Update friend's (B) friendList to include person (A)
  app.post('/api/friend', async (req, res) => {
    const { friendID, personID } = req.body;
    // Find the friend with friendID and update their friendList
    // Assuming you have a FriendModel with a friendList field
    const friend = await FriendModel.findOne({ personID: friendID });
    friend.friendList.push(personID);
    friend.save();
    res.status(200).json({ message: 'FriendList updated.' });
  });
  
  // Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });