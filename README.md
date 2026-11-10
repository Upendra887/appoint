# AppHosp

A full-stack-ready healthcare booking MVP for patients and hospital operations.

## Run locally

1. Install Node 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Optional services: `docker compose up -d`.
5. For a database-backed run, execute `npx prisma migrate dev --name init` and `npx prisma generate`.
6. Start the app with `npm run dev` and open `http://localhost:3000`.

The local MVP uses seeded data with a mock OTP and mock payment flow. It now includes real scannable QR booking passes, editable profile persistence, dynamic hospital selection, a validated appointment API with five-minute in-memory slot locking, and a queue API. The Prisma schema, Docker services, API boundaries, translation resources, and provider interfaces are ready for PostgreSQL, Redis, real OTP, and payment credentials.

## Deploy to Vercel

The project is configured for Vercel and generates the Prisma client automatically during install. From this directory, run `npx vercel --name apphosp` and follow the prompts. For a production deployment, add `DATABASE_URL` to the Vercel project environment variables using a hosted PostgreSQL connection string, then run `npx vercel --prod --name apphosp`.

The current MVP keeps OTP, payments, and slot locks in mock or in-memory providers. Use a hosted PostgreSQL database and the provider integrations described below before treating the deployment as production-ready.

## Demo flows

- Patient: sign in with any name and 10-digit number, then use any 4-digit OTP.
- Reception, Doctor, Hospital Admin: use the prefilled demo accounts and `demo1234`.
- Patient booking: choose any hospital, doctor mode, and slot. The API rejects a second reservation for the same doctor/date/time until the lock expires.
- Booking pass: scan the QR code to verify the booking payload; the reference itself is not embedded as unrestricted patient data.

## Production work remaining

Connect the provider interfaces to a real auth/session service, SMS OTP provider, payment gateway, Redis slot locks, PostgreSQL repositories, and WebSocket event transport. The current demo deliberately keeps these integrations mockable and does not include secrets.

Demo roles: Patient, Receptionist, Doctor, Hospital Admin. Use the role switcher in the header to preview each operational view.
