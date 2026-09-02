# BodyShody 
BodyShody is a multi-page AI-powered fitness and nutrition companion — a single place to log meals, track workouts, watch your progress trend over time, and talk things through with FitGemini, an in-app AI gym instructor and nutritionist you can actually have a live voice conversation with.

It's built as a clean, card-based dashboard (Overview, Fuel, Move, Progress, Insights, Goals, Settings) sitting on top of the Google Gemini API for two things that used to feel like "someday" features: a voice call with an AI coach, and a camera that can estimate a meal's macros from a photo.

# Images 

Landing Page
<img width="1897" height="1078" alt="Screenshot 2026-09-02 123757" src="https://github.com/user-attachments/assets/55d00011-843b-4f83-867d-14c579010f0c" />

About Page 
<img width="1891" height="1078" alt="image" src="https://github.com/user-attachments/assets/3ec85155-6fd7-45ae-8eb4-b86c34d966fc" />

Sign-in Page
<img width="1896" height="906" alt="Screenshot 2026-08-02 164437" src="https://github.com/user-attachments/assets/2a6b01ff-c257-4b10-bbf0-6457bafaec7d" />

Meal
<img width="1887" height="903" alt="Screenshot 2026-08-02 165115" src="https://github.com/user-attachments/assets/bc3ccaa7-7e32-4e90-9c9f-426d6ee628b1" />

FitGemini
<img width="1871" height="890" alt="Screenshot 2026-08-02 165131" src="https://github.com/user-attachments/assets/b7531c94-9727-47a7-b4fa-5716c7a6f3da" />

Insights
<img width="1882" height="882" alt="Screenshot 2026-08-02 165151" src="https://github.com/user-attachments/assets/ae3d5e5d-e732-4dfb-ab46-f77c05e3b834" />

Progress
<img width="1886" height="863" alt="Screenshot 2026-08-02 165621" src="https://github.com/user-attachments/assets/acb5bfa5-fd8d-4ff8-b66e-7c6fb1d5e1e0" />

Settings
<img width="1876" height="907" alt="Screenshot 2026-08-02 165207" src="https://github.com/user-attachments/assets/5a411cb5-755c-4c18-8886-964d45976146" />

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
