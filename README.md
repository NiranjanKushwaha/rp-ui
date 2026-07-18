# rp-ui

Next.js storefront for Pure Roots (Phase-0 Trust Wedge). Responsive web → later RN WebView.

## Run

```bash
cp .env.example .env.local
npm install
npm run dev
```

- App: http://localhost:3000/en  
- Hindi: http://localhost:3000/hi  
- Verify: http://localhost:3000/en/verify  
- Try code: `PR-114-0832` (API must be on :4000)

## Stack

- Next.js App Router + Tailwind  
- next-intl (`en` / `hi`)  
- Design tokens: Pure Roots (Fraunces + Instrument Sans)

## Routes

- `/{locale}` — Homepage  
- `/{locale}/verify` — Lookup  
- `/{locale}/verify/[code]` — Result  
- `/{locale}/admin/login` — stub  
- `/{locale}/admin/batches` — stub list  
