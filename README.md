# Pocket Plan

## Run Backend

```powershell
cd Backend\app
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend runs on http://127.0.0.1:8000 (and is reachable on your LAN IP for phone testing).

## Run Frontend

```powershell
cd Frontend
npm install
npx expo start --tunnel
```

If you are working only on the frontend locally, keep `EXPO_PUBLIC_API_BASE_URL=http://localhost:8000` in `Frontend/.env`.
If you are testing on a phone, replace `localhost` with your computer's LAN IP before starting Expo.

## Run Frontend-Admin

```powershell
cd Frontend-Admin
npm install
npm run dev
```

## Environment Files

- `Backend/.env` for backend settings such as MongoDB.
- `Frontend/.env` for Expo variables like `EXPO_PUBLIC_API_BASE_URL`.
- `Frontend-Admin/.env` if the admin app needs environment variables.
