import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY as string;

async function chatWithDeepSeek(message: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "HTTP-Referer": "http://localhost",   // optional, for ranking
      "X-Title": "DeepSeek TS App",         // optional, for ranking
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  
  if (data.error) {
    console.error("❌ API Error:", data.error);
    return;
  }

  console.log("🤖 AI:", data.choices[0].message.content);
}

async function main() {
  await chatWithDeepSeek("Hello DeepSeek, what is the meaning of life?");
}

main();
