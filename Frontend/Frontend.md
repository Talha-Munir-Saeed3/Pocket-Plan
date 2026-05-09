# Frontend Overview

Pocket Plan mobile app lives in Frontend and is built with Expo Router.

## Folder Structure

- Frontend/app: Route entry files and navigation groups for auth, tabs, and stack screens.
- Frontend/src/screens: Screen implementations grouped by feature.
  - auth: Sign in, sign up, forgot password.
  - home: Dashboard and main landing experience.
  - transactions: Add transaction and history flows.
  - budget: Budget planner screens.
  - premium: Premium and subscription screens.
  - reports: Reporting and analytics screens.
  - settings: User settings and preferences.
  - ai: AI chat assistant screens.
- Frontend/src/components: Reusable UI blocks.
  - common: Buttons, inputs, layout wrappers.
  - cards: Card-style display components.
- Frontend/src/styles: Shared style definitions.
- Frontend/assets: App static assets.

## Run Command

From the `Frontend` folder:

```powershell
npm install
npx expo start --tunnel
```

## API URL

For frontend-only local work, keep `EXPO_PUBLIC_API_BASE_URL=http://localhost:8000` in `Frontend/.env`.
If you are testing on a physical phone, replace `localhost` with your computer's LAN IP.
