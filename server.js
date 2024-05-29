import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file in the root directory

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to interact with OpenAI API
app.post('/api/openai', async (req, res) => {
  const { message } = req.body;
  try {
    console.log("KEYYY, ", process.env.OPENAI_KEY); // logging key 
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
      }
    });

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching response from OpenAI API', error);
    res.status(500).json({ error: 'Error fetching response from OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
