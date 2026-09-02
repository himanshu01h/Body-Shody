/**
 * Shared Gemini API client for BodyShody.
 *
 * Call order:
 *  1. Try a same-origin serverless proxy at /api/gemini (see /api/gemini.js).
 *     This lets you deploy once (e.g. on Vercel) with a single GEMINI_API_KEY
 *     environment variable — visitors never need to paste their own key.
 *  2. If no proxy exists (e.g. testing locally by just opening the HTML file,
 *     or hosting somewhere without serverless functions), fall back to a
 *     personal key saved in this browser's Settings page (localStorage).
 *
 * Real upstream errors (bad key, quota exceeded, etc.) are always surfaced
 * to the caller — only a genuinely missing/unreachable proxy triggers the
 * fallback to the local key.
 */
window.BodyShodyGemini = (function () {
  const MODEL = 'gemini-3.6-flash';

  async function callGemini({ contents, systemInstruction, generationConfig }) {
    // 1. Try the server-side proxy first.
    try {
      const proxyResp = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, systemInstruction, generationConfig })
      });

      if (proxyResp.status !== 404) {
        let data;
        try { data = await proxyResp.json(); } catch (e) { data = null; }
        if (!proxyResp.ok) {
          const msg = data?.error?.message || data?.error || `Server error (${proxyResp.status})`;
          throw new Error(msg);
        }
        return data;
      }
      // status === 404 → no /api/gemini function deployed here, fall through.
    } catch (err) {
      // A TypeError here means the fetch itself failed (no network route to
      // /api/gemini at all — e.g. opening the file directly with file://).
      // Anything else is a real error from a proxy that DOES exist, so it
      // should be shown to the user rather than silently swallowed.
      if (!(err instanceof TypeError)) throw err;
    }

    // 2. Fall back to a personal key stored in this browser.
    const apiKey = localStorage.getItem('bodyshody_gemini_key');
    if (!apiKey) {
      throw new Error(
        'No Gemini API key found. Add one on the Settings page — or, if you deploy this app, ' +
        'set a GEMINI_API_KEY environment variable on the server so nobody has to paste a key.'
      );
    }

    const resp = await fetch(
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
    const data = await resp.json();
    if (!resp.ok) {
      const msg = data?.error?.message || `Gemini API error (${resp.status})`;
      throw new Error(msg);
    }
    return data;
  }

  return { callGemini };
})();
