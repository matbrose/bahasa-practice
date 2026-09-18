// A tiny key/value store backed by Upstash Redis, so progress is the same
// on every device instead of stuck in one browser. Add "Upstash for Redis"
// to this project from the Vercel Marketplace/Integrations tab; it injects
// the REST URL and token as env vars automatically (either KV_REST_API_URL/
// KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN,
// depending on how it was added -- both names are checked below). Gated by
// the same shared passphrase as /api/ask (set as APP_SECRET in Vercel).
//
// Talks to Upstash's plain REST API directly (one JSON command per call),
// no npm package needed.

async function upstashCmd(cmd) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("No Redis configured: set KV_REST_API_URL/KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN) in Vercel.");
  }
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const d = await r.json();
  if (d && d.error) throw new Error(d.error);
  return d.result;
}

module.exports = async (req, res) => {
  const secret = req.headers["x-app-secret"];
  if (!process.env.APP_SECRET || secret !== process.env.APP_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "GET") {
      const key = req.query.key;
      if (!key || typeof key !== "string") {
        res.status(400).json({ error: "Missing key" });
        return;
      }
      const value = await upstashCmd(["GET", `bahasa:${key}`]);
      res.status(200).json({ value: value == null ? null : value });
      return;
    }

    if (req.method === "POST") {
      const { key, value } = req.body || {};
      if (!key || typeof value !== "string") {
        res.status(400).json({ error: "Bad request" });
        return;
      }
      await upstashCmd(["SET", `bahasa:${key}`, value]);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
