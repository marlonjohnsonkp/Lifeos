# LifeOS MVP

A career-first, mobile-friendly personal operating system built as a static PWA.

## Run locally
- Open `index.html` in a browser for basic use.
- For PWA install/offline support, serve this folder over HTTPS or localhost. Example: `python -m http.server 8000` then visit `http://localhost:8000`.
- Deploy the folder as a static site on a free static hosting plan if available.

## Included
- Adaptive-style daily task list (editable, flexible tasks)
- Career roadmap, skill checklist, resume truth-checklist and job/project tracker
- Discipline habits, focus timer and daily check-in/review
- Local income/expense ledger
- Hypothetical intraday paper-trade journal
- JSON export/import and local reset
- PWA manifest and offline static cache

## MVP limits
- Data is stored in this browser's localStorage; it is not synced, encrypted, or backed up automatically.
- No account/login, cloud database, cross-device sync, AI assistant, background push notifications, live market prices, broker integration, job-site scraping or automatic job applications.
- Focus timer works while the page is open; background browser throttling may affect it.
- The trading journal calculates gross hypothetical P/L only; it excludes charges and is not a recommendation.
- The career path is a starting recommendation based on existing web skills; adjust based on actual job descriptions and your progress.

## Next build milestones
1. Add account authentication and a secure database only if a free-tier plan fits.
2. Add tested reminder/notification permissions and time-zone-aware schedules.
3. Add weekly review analytics and user-controlled plan adjustments.
4. Add optional AI planning only after safe, affordable provider access is confirmed.
5. Test accessibility, offline behavior, data migration and Android installation on real devices.
