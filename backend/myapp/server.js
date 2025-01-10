const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000; // You can use any port you prefer

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data from the frontend

// Hard-coded user data for testing
const users = [
  { email: "test@example.com", password: "password123" },
  { email: "user@example.com", password: "user123" }
];

// API endpoint to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (user.password === password) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(400).json({ message: 'Incorrect password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
