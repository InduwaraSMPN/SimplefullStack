require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors()); // Allows requests from other origins (like our React app)
app.use(express.json()); // Parses incoming JSON requests

// Basic route to check if the server is running
app.get('/', (_req, res) => {
  res.send('Hello WSO2')
})

// API Endpoint
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  
  console.log('Received message:', message);
  
  // Send a response back to the client
  res.json({ 
    reply: `Server received your message: "${message}"`,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});