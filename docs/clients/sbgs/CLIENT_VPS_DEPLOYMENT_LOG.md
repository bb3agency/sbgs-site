# Client VPS Deployment Log — Sri Sai Baba Ghee Sweets

> **Scope:** Phases 6–14. Master runbook: [CLIENT_ONBOARDING_EXECUTION_ORDER.md](../../../backend/docs/CLIENT_ONBOARDING_EXECUTION_ORDER.md)

---

## Project Identity

| Field | Value |
|---|---|
| Client name | Sri Sai Baba Ghee Sweets |
| `CLIENT_ID` | `sbgs` |
| Domain | `srisaibabasweets.com` (details in gitignored [VPS_INPUTS.md](./VPS_INPUTS.md)) |
| Admin path | `/admin` |
| Backend port | `3002` |
| Storefront port | `3102` |
| VPS IP | `178.104.46.202` |
| Deploy user | `d_user` |
| Git repo | `https://github.com/bb3agency/sbgs-site` |
| Backend path | `/var/www/sbgs/backend` |
| Frontend path | `/var/www/sbgs/frontend` |
| Image CDN | `https://cdn.srisaibabasweets.com` (Cloudflare R2) |
| DNS | Cloudflare (nameservers updated at Namecheap) |
| Phase 5 (local) | 2026-05-23 |
| Last updated | 2026-06-20 |

---

## 2026-06-20 — Progress log

- **Turnstile + Ops login fixed end-to-end.** Root causes were (1) DNS records for the apex/`www` were DNS-only instead of Proxied, and Bot Fight Mode was blocking the Turnstile challenge; (2) backend `TURNSTILE_SECRET_KEY` belonged to a different Cloudflare Turnstile widget than the frontend's site key, so Cloudflare's `siteverify` returned `invalid-input-secret` → backend mapped this to a 502 on `POST /api/v1/ops/auth/login/request-otp`. Fixed by issuing a secret from the same widget as the live site key and recreating (not restarting) the backend/workers containers — `env_file: .env` is only read at container creation. Full diagnosis + the still-open action item (recording the corrected secret) are in [VPS_INPUTS.md](./VPS_INPUTS.md).
- **Runtime readiness profile locked in:** prepaid-only via Razorpay (no COD/noop), Cloudflare R2 for product media (`local` is blocked in production), no SMS provider (`SMS_PROVIDER=noop` is valid in production, unlike `PAYMENT_PROVIDER=noop`). Required keys for this profile are listed in [VPS_INPUTS.md](./VPS_INPUTS.md) § Runtime readiness — Ops UI saves for these are still pending (see Phase 8 below).
- **Product image upload reliability fix landed** (commit `8dbd3a5`): admin image upload had three compounding bugs — a DTO-serialization 500 *after* successful upload, false-positive "declared MIME mismatch" 400s on legitimate images, and the nginx maintenance `auth_request` gate buffering/breaking larger multipart uploads. All three fixed; see `backend/CHANGELOG.md` / `frontend/CHANGELOG.md` `[Unreleased]` for the full propagation notes. **Action:** confirm the updated `nginx/client.conf.template` has been re-rendered on the live VPS config (`nginx -t && systemctl reload nginx`) — template changes don't auto-apply to already-deployed `/etc/nginx/sites-available/<domain>` files.
- Manual `npm run build` should never be run directly on the VPS while PM2 is serving — it races with the live `.next` directory and causes "Failed to load chunk" errors. Use the CD pipeline (`phase10-frontend-deploy.sh` / GitHub Actions) instead.

---

## Phase 6 — VPS Baseline

**Status:** `[~]` scripts ready — execute on VPS

- [ ] Run `bash docs/clients/sbgs/scripts/phase6-host-baseline.sh` (from repo root on VPS after clone)
- [ ] Full checklist: [CLIENT_VPS_DEPLOYMENT_LOG_TEMPLATE.md](../../../backend/docs/CLIENT_VPS_DEPLOYMENT_LOG_TEMPLATE.md)

---

## Phase 7 — Backend deploy

**Status:** `[x]` backend health OK on loopback (2026-05-24)

- [x] `production.backend.env` on VPS at `backend/.env`
- [x] Run `phase7-backend-deploy.sh`
- [x] `curl http://127.0.0.1:3002/api/v1/health` OK
- [ ] Redis not published on host `6379` in production (`docker-compose.prod.yml` `redis.ports: !reset []`; multi-client VPS)
- [ ] `phase7.5-nginx-tls-preflight.sh` then Nginx + Certbot per [VPS_DEPLOYMENT_PACK.md](./VPS_DEPLOYMENT_PACK.md) § multi-client

---

## Phase 8 — Ops bootstrap

**Status:** `[ ]` blocked until live Resend

- [ ] Run `phase8-ops-bootstrap.sh` or manual `ops:newuser`
- [x] Ops login (Turnstile + OTP) verified working end-to-end (2026-06-20)
- [ ] Ops UI config save for Runtime readiness profile (Razorpay webhook allowlist CIDR, R2 chain, `SMS_PROVIDER=noop`, `REPLAY_APPROVAL_TOKEN`) + container restart — see [VPS_INPUTS.md](./VPS_INPUTS.md) § Runtime readiness

---

## Phase 7.6 — GitHub CD (self-hosted runner)

**Status:** `[ ]` configure after Phase 7 (+ PM2 for frontend CD)

> Guide: [backend/docs/GITHUB_CD_SELF_HOSTED_RUNNER_GUIDE.md](../../../backend/docs/GITHUB_CD_SELF_HOSTED_RUNNER_GUIDE.md)

- [ ] Monorepo at `/var/www/sbgs` (single clone)
- [ ] Runner installed: `sbgs-vps` label
- [ ] GitHub Variables + Secrets per [GITHUB_CD_SETUP.md](./GITHUB_CD_SETUP.md)
- [ ] Root workflows on `main`: `.github/workflows/reliability-ci.yml`, `deploy.yml`
- [ ] Test push to `main` → CI green → Deploy jobs on VPS runner

---

## Phase 10 — Frontend

**Status:** `[~]` production-ready locally — deploy on VPS

- [x] [frontend/.env.production.example](../../../frontend/.env.production.example) — `srisaibabasweets.com` + `cdn.srisaibabasweets.com` CDN
- [ ] Copy to `.env.production.local` on VPS and run [phase10-frontend-deploy.sh](./scripts/phase10-frontend-deploy.sh)
- [ ] `pm2` process `sbgs-frontend`

## Razorpay — Payments

**Status:** `[~]` live keys in vault; dashboard webhook + Ops save + frontend env pending

- [x] `RAZORPAY_WEBHOOK_SECRET` generated → [VPS_INPUTS.md](./VPS_INPUTS.md) (gitignored vault)
- [x] Razorpay **live** `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` recorded in [VPS_INPUTS.md](./VPS_INPUTS.md) (2026-05-23)
- [x] Public runbook [RAZORPAY_PAYMENTS_SETUP.md](./RAZORPAY_PAYMENTS_SETUP.md)
- [ ] Razorpay Dashboard → webhook URL + secret + 3 events (`payment.captured`, `payment.failed`, `refund.processed`)
- [ ] Ops UI → Payments → `PAYMENT_PROVIDER`, keys, webhook secret → restart API/workers
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_Szr9LAUchr3Sk3` in `frontend/.env.production.local` on VPS + frontend deploy

## Cloudflare R2 — Product media

**Status:** `[~]` bucket + CDN hostname live; Ops save pending on VPS

- [x] R2 bucket `sbgs-product-images`
- [x] Custom domain `cdn.srisaibabasweets.com`
- [x] Credentials documented in [VPS_INPUTS.md](./VPS_INPUTS.md) + [CLOUDFLARE_R2_MEDIA.md](./CLOUDFLARE_R2_MEDIA.md)
- [ ] Ops UI → Product Media → save + restart API/workers on VPS
- [ ] Admin upload smoke → image URL on `cdn.srisaibabasweets.com`

---

## Phase 5 / 12 — Evidence

- [ ] [PHASE5_EVIDENCE_CHECKLIST.md](./PHASE5_EVIDENCE_CHECKLIST.md)

---

## Post-go-live core updates

Synced from `ecom-platform-template` and auto-deployed via GitHub CD on push to `main`.

| Core version | Date | Change | Operator action |
|--------------|------|--------|-----------------|
| backend-core 0.1.17 / frontend-core 0.1.12 | 2026-06-30 | Drag-and-drop variant ordering (`ProductVariant.sortOrder` + reorder endpoint; admin order now drives storefront order) | migration auto-applied on deploy |
| backend-core 0.1.18 | 2026-06-30 | Register variant-reorder route in admin policy registry (CI gate fix) | none |
| backend-core 0.1.19 | 2026-06-30 | WhatsApp template registry (match approved Meta templates) | optional — WhatsApp **not configured** for SBGS. To enable: fill [VPS_INPUTS.template.md](./VPS_INPUTS.template.md) §Meta WhatsApp, create the templates per `backend/docs/WHATSAPP_TEMPLATE_REGISTRY.md`, then set `primaryChannels` |
| backend-core 0.1.20 | 2026-07-01 | **Guest cart persistence fix** — guest carts were minting a new empty cart each request; now keyed to the `cart_session` cookie token. Guest cart + merge-on-login work. | none |
| backend-core 0.1.21 | 2026-07-01 | Guest cart: normalize blank `cart_session` token (was storable as `''`, colliding blank-cookie guests onto one shared cart) | none |
