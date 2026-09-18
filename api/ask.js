// Thin proxy to the Anthropic Messages API. Holds ANTHROPIC_API_KEY
// server-side (set it in Vercel Project Settings -> Environment Variables)
// so the key never reaches the browser. Gated by the same shared
// passphrase as /api/storage (set as APP_SECRET in Vercel).

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = req.headers["x-app-secret"];
  if (!process.env.APP_SECRET || secret !== process.env.APP_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { system, messages } = req.body || {};
  if (typeof system !== "string" || !Array.isArray(messages)) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured on the server." });
    return;
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
        max_tokens: 4096,
        system,
        messages,
      }),
    });
    const d = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: (d && d.error && d.error.message) || "Anthropic API error" });
      return;
    }
    const text = (d.content || []).map((c) => (c.type === "text" ? c.text : "")).join("").trim();
    console.log("ask debug: stop_reason=" + d.stop_reason + " len=" + text.length + " preview=" + JSON.stringify(text.slice(0, 300)));
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
