require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT; // 🔧 Render injecte automatiquement le bon port
const API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/tarot", async (req, res) => {
  const { question } = req.body;
  const prompt = `Agis comme un tarotiste intuitif. Voici la question : "${question}". Sélectionne 5 cartes au hasard du tarot et propose une interprétation claire, concise et utile.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const result = await openaiRes.json();
    const answer = result.choices?.[0]?.message?.content || "❌ Réponse non générée.";
    res.json({ answer });
  } catch (err) {
    console.error("Erreur OpenAI:", err);
    res.status(500).json({ error: "Erreur lors de l'appel à OpenAI." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur le port ${PORT}`);
});
