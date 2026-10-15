# BeniShop Backend

A separate Express + TypeScript API for the existing React/Vite frontend. The frontend's root package.json and scripts remain unchanged.

## Requirements

- Node.js 20.19+ or 22.12+ (compatible with Vite 8 and this backend)
- npm
- PostgreSQL 15+ (install/configure in the next setup step)

## Local setup

From the repository root:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `.env` and set `DATABASE_URL` to your local PostgreSQL username/password/database. Do not commit `.env`.

Start the API (the health endpoint does not require a database connection yet):

```powershell
npm run dev
```

Open http://localhost:4000/api/health. A successful response has `status: "ok"`.

## PostgreSQL and Prisma

After PostgreSQL is installed and the `benishop` database exists:

```powershell
npm run db:generate
npm run db:migrate -- --name init
```

To inspect the local database:

```powershell
npm run db:studio
```

## Scripts

- `npm run dev`: run TypeScript in watch mode
- `npm run build`: compile to `dist/`
- `npm run typecheck`: check TypeScript without emitting files
- `npm start`: run the compiled API
- `npm run db:generate`: generate Prisma Client
- `npm run db:migrate`: create/apply a development migration
- `npm run db:deploy`: apply committed migrations in deployment
- `npm run db:studio`: open Prisma Studio

Authentication endpoints are intentionally not implemented in this foundation commit. They will be added after local Node/PostgreSQL setup is confirmed.
