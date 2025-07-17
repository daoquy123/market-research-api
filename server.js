const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy login
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    return res.json({
      token: 'dummy.jwt.token',
      user: { id: 1, email }
    });
  }
  res.status(400).json({ message: 'Missing credentials' });
});

// Get surveys
app.get('/surveys', (req, res) => {
  res.json([
    {
      id: 101,
      title: "Smartphone Usage Trends 2025",
      client_id: 12,
      status: "active",
      launch_date: "2025-08-01"
    }
  ]);
});

// Get questions of a survey
app.get('/surveys/:id/questions', (req, res) => {
  res.json([
    {
      id: 301,
      survey_id: parseInt(req.params.id),
      type: "multiple_choice",
      question_text: "How often do you use your smartphone daily?",
      options: ["< 1 hour", "1-3 hours", "3-6 hours", "> 6 hours"]
    }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
