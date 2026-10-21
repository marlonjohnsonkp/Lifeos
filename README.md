# LifeOS MVP — AI + Reminders update

## Deploy
Deploy this directory to Vercel. The app is static HTML plus a Vercel serverless endpoint at `/api/ai`.

## Enable real AI (free tier subject to Google's current limits)
1. Create an API key at https://aistudio.google.com/app/apikey
2. In Vercel, open project `lifeos-mvp` → Settings → Environment Variables.
3. Add `GEMINI_API_KEY` with your key for Production (and Preview if desired).
4. Redeploy after adding the variable. Do not put the key in `index.html`, GitHub, or a public message.
5. Open LifeOS → AI Assistant. It should show “AI ready”.

The key is used only by `/api/ai` on the server. Gemini's free tier has model-specific quotas and terms; check Google's current docs. This endpoint limits input/output size but does not implement per-user rate limiting, so do not share the endpoint widely.

## Reminders
Reminders are stored in browser localStorage. Notifications need permission and can fire while the app is open and running. Browsers/Android may suspend timers or stop the page when closed; reliable closed-app push requires a push subscription and server-side store/sender. Use Android Clock/Calendar for critical alarms.

## Privacy and limitations
- Tasks and reminder records remain in browser localStorage; no account or cloud sync.
- The app sends the current message plus a small task/career context to Google's Gemini API only when AI is used.
- Do not enter passwords, API keys, or highly sensitive data in chat. AI can be wrong.
- No job applications, payments, trades, emails, or external actions are executed automatically.
