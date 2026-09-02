// Vercel serverless function: POST /api/gemini
//
// Proxies requests to the Google Gemini API using a server-side API key,
// so the key never has to live in the browser or be pasted by each visitor.
//
// SETUP (Vercel):
//   1. Deploy this project to Vercel (this file is auto-detected as a
//      serverless function because it lives in /api).
//   2. In your Vercel project settings → Environment Variables, add:
//        GEMINI_API_KEY = <your Gemini API key>
//      (Get a key at https://aistudio.google.com/apikey)
//   3. Redeploy. That's it — every visitor now uses this one key
//      automatically via this proxy, no Settings-page key required.
//
// The frontend (assets/gemini-client.js) calls this endpoint first and
// only falls back to a personal browser-stored key if this route doesn't
// exist (e.g. when just opening the HTML files locally without a server).

const MODEL = 'gemini-3.6-flash';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'GEMINI_API_KEY is not set on the server. Add it in your Vercel project\'s ' +
             'Environment Variables, or have visitors add their own key on the Settings page instead.'
    });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { contents, systemInstruction, generationConfig } = body;

    if (!contents) {
      res.status(400).json({ error: 'Missing "contents" in request body.' });
      return;
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents,
          system_instruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
          generationConfig: generationConfig || { temperature: 0.8, maxOutputTokens: 1024 }
        })
      }
    );

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: String(err && err.message ? err.message : err) });
  }
};
