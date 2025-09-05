import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

// keep API key safe here
const API_KEY = "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";

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-r1:free",  // ✅ correct model
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to API" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
