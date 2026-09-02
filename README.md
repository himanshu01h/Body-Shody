# BodyShody — deploying to Vercel

## Do I need to paste my Gemini API key every time?

**No — not if you deploy with the steps below.** The app tries a server-side
proxy (`/api/gemini`) first. If you set your key once as a Vercel
environment variable, that proxy handles every request for every visitor —
nobody ever needs to open Settings and paste a key.

The Settings-page "paste your key" option still exists as a fallback, for
when you're just opening the HTML files locally (e.g. double-clicking
`signin.html`) without any server behind them, where a serverless function
can't run.

## One-time setup

1. Push this whole folder (including the `api/` and `assets/` folders) to a
   GitHub repo, or deploy it directly with the Vercel CLI (`vercel deploy`
   from inside this folder).
2. In the Vercel dashboard, open your project → **Settings → Environment
   Variables**, and add:

   | Key | Value |
   |---|---|
   | `GEMINI_API_KEY` | your key from https://aistudio.google.com/apikey |

3. Redeploy (Vercel does this automatically after saving an env var, or
   trigger a redeploy manually).

That's it. `/api/gemini.js` is auto-detected by Vercel as a serverless
function because it lives in the `api/` folder — no extra config needed.

## About the 429 "quota exceeded" error

That error comes directly from Google, not from this app — it means the
API key in use has hit its request limit (the free tier has fairly low
per-minute/per-day limits, especially for image analysis). To fix it:

- Check your usage/limits at https://aistudio.google.com/ or the
  [Google Cloud Console](https://console.cloud.google.com/) under
  "APIs & Services → Gemini API".
- Enable billing on the project for higher limits, or wait for the quota
  window to reset.
- If you're using a personal key (Settings page fallback), try a different
  key or upgrade its plan.

## Folder structure this app expects

```
/
├── index.html          (redirects to signin.html)
├── signin.html
├── overview.html
├── fuel.html
├── move.html
├── progress.html
├── insights.html
├── goals.html
├── settings.html
├── fitgemini.html
├── assets/
│   ├── gemini-client.js
│   ├── signin-bg.jpg
│   └── bodyshody-logo.png
└── api/
    └── gemini.js        (Vercel serverless function)
```

Keep this structure intact when deploying — the pages reference `assets/`
and `/api/gemini` by relative/root path.
