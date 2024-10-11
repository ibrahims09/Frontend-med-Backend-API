const express = require('express');
const router = express.Router();
const { getOpenAIResponse } = require('../utils/openai');

router.post('/content', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await getOpenAIResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching response from OpenAI.' });
  }
});

module.exports = router;
