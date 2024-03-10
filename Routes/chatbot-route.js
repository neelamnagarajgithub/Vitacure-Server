const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const router = express.Router();
dotenv.config({path:'./config.env'});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role:"assistant",content:prompt}],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.send(response.choices[0].message.content);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
