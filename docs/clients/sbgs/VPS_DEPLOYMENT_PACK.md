# Sri Sai Baba Ghee Sweets — VPS Deployment Pack

Use this pack when executing [CLIENT_ONBOARDING_EXECUTION_ORDER.md](../../../backend/docs/CLIENT_ONBOARDING_EXECUTION_ORDER.md) Phases 6–8. **Do not commit production secrets to git.**

Fill [VPS_INPUTS.md](./VPS_INPUTS.md) first, then run scripts under [scripts/](./scripts/).

## Client identity

| Field | Value |
|-------|-------|
| Client name | Sri Sai Baba Ghee Sweets |
| `CLIENT_ID` | `sbgs` |
| `BACKEND_PORT` | `3001` (confirm free on VPS) |
| `STOREFRONT_PORT` | `3101` |
| `POSTGRES_DB` (host) | `sbgs` |
| VPS backend path | `/var/www/sbgs/backend` |
| VPS frontend path | `/var/www/sbgs/frontend` |
| Local API (dev) | `http://localhost:3102/api/v1` (Next rewrite → backend `3000`) |
| Production API | `https://srisaibabasweets.com/api/v1` |
| Production domain | `srisaibabasweets.com` |
| DNS provider | **Cloudflare** (nameservers at Namecheap → Cloudflare) |
| Image CDN | `https://cdn.srisaibabasweets.com` (R2 custom domain) |
| VPS IP | `178.104.46.202` |

## Docker Compose on VPS

Production uses **host PostgreSQL** (port 5432) plus **Compose Redis + backend + workers** only:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml -p sbgs up -d backend workers
```

Do **not** run plain `docker compose up -d` on VPS — it starts a second Postgres container and fails with `address already in use` on `:5432`.

## Host-side Prisma migrations

Production `.env` keeps `DATABASE_URL` on `host.docker.internal` for **containers**. On the VPS **host shell**, that hostname does not resolve.

- **Do not** run bare `npx prisma migrate deploy` on the host (expected `P1001` at `host.docker.internal:5432`).
- **Do** use [scripts/phase7-backend-deploy.sh](./scripts/phase7-backend-deploy.sh) (applies `127.0.0.1` override), or manually:

```bash
cd /var/www/sbgs/backend
MIGRATE_DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | cut -d= -f2- | sed 's/host\.docker\.internal/127.0.0.1/')"
DATABASE_URL="$MIGRATE_DATABASE_URL" npx prisma migrate deploy --schema prisma/schema.prisma
```

`No pending migrations to apply.` means the DB is current — proceed to compose up. See [PHASE7_VPS_DEPLOY_INCIDENT_PLAYBOOK.md](../../../backend/docs/PHASE7_VPS_DEPLOY_INCIDENT_PLAYBOOK.md) §C.

## Phase 1 production `.env` (bootstrap-only)

Copy to VPS `/var/www/sbgs/backend/.env` from vault. Template: [production.backend.env.example](./production.backend.env.example) (**bootstrap only** — no `MEDIA_STORAGE_PROVIDER` or `R2_*`; configure Product Media in Ops UI after Phase 8).

**Session refresh on production:** After TLS, confirm `TRUSTED_PROXY_ALLOWLIST_CIDR` includes your Nginx/proxy CIDR (via Ops UI or bootstrap `.env`) so refresh token device binding sees the real client IP. Frontend `NEXT_PUBLIC_API_BASE_URL` must be `https://<domain>/api/v1` (same origin as the storefront). Admins must re-login once after deploying the 2026-06-01 refresh-binding fix if reload still logs them out.

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Do not** put Razorpay, Delhivery/Shiprocket, MSG91, webhook tokens, or `OPS_METRICS_TOKEN` in `.env` — configure via Ops UI after Phase 8. See [ENV_VS_DB_CONFIG_REFERENCE.md](../../../backend/docs/ENV_VS_DB_CONFIG_REFERENCE.md).

## GitHub Actions (CD)

- **Full guide:** [backend/docs/GITHUB_CD_SELF_HOSTED_RUNNER_GUIDE.md](../../../backend/docs/GITHUB_CD_SELF_HOSTED_RUNNER_GUIDE.md)
- **SBGS values:** [GITHUB_CD_SETUP.md](./GITHUB_CD_SETUP.md)

## Nginx + TLS (multi-client VPS)

This VPS hosts **multiple clients**. SBGS is **slot 2**: ports **3001** / **3101**, domain **`srisaibabasweets.com`**. Canonical rules: [CLIENT_VPS_SETUP_GUIDE.md](../../../backend/docs/CLIENT_VPS_SETUP_GUIDE.md) §11.0.

**Preflight (run before editing Nginx):**

```bash
cd /var/www/sbgs
bash docs/clients/sbgs/scripts/phase7.5-nginx-tls-preflight.sh
```

| Check | SBGS action |
| --- | --- |
| Other sites | `ls /etc/nginx/sites-enabled/` — **do not remove** other clients' symlinks |
| `default` site | **Do not** `rm sites-enabled/default` unless you verified it is unused |
| Rate zones | Once per VPS: `rate-zones.conf.template` → `/etc/nginx/snippets/rate-zones.conf` + `include` in `nginx.conf` `http {}` |
| Redis host port | Production deploy uses `docker-compose.prod.yml`, which sets `redis.ports: !reset []` so Redis is **not** published on host `6379`. Local dev keeps `6379:6379` in base `docker-compose.yml`. On multi-client VPS, never bind host `6379` — only one client can own that port. |
| Port conflict | `ss -tlnp \| grep -E '3001\|3101'` — must be free or owned by `sbgs-*` / PM2 |

**Install (additive — this domain only):**

1. `client.conf.template` → `/etc/nginx/sites-available/srisaibabasweets.com` (domain-based filename)
2. `sudo sed -i 's/client1\.com/srisaibabasweets.com/g' /etc/nginx/sites-available/srisaibabasweets.com`
3. `proxy_pass` → `127.0.0.1:3002` (API), `/` → `127.0.0.1:3102` (storefront — after Phase 10)
4. `sudo ln -sf /etc/nginx/sites-available/srisaibabasweets.com /etc/nginx/sites-enabled/`
5. `sudo nginx -t && sudo systemctl reload nginx`
6. `sudo certbot --nginx -d srisaibabasweets.com -d www.srisaibabasweets.com`
7. After certs: redeploy full HTTPS template from repo (same paths), reload nginx

Templates: [backend/nginx/](../../../backend/nginx/)

## Webhook URLs (after TLS)

- `https://<PRODUCTION_DOMAIN>/api/v1/payments/webhook`
- `https://<PRODUCTION_DOMAIN>/api/v1/shipping/webhook`

## Product image storage (Cloudflare R2)

**Canonical reference:** [CLOUDFLARE_R2_MEDIA.md](./CLOUDFLARE_R2_MEDIA.md)

| R2 field | Value |
|----------|-------|
| Bucket | `sbgs-product-images` |
| `R2_PUBLIC_BASE_URL` | `https://cdn.srisaibabasweets.com` |
| `R2_ENDPOINT` | `https://2e87c8fb8842d3a372a5abc98b5cd6cf.r2.cloudflarestorage.com` |

Credentials → Ops UI only (vault: [VPS_INPUTS.md](./VPS_INPUTS.md)). Frontend `NEXT_PUBLIC_IMAGE_CDN_URL=https://cdn.srisaibabasweets.com`.

After backend deploy, ensure writable media directory for **local** fallback only:

```bash
sudo mkdir -p /var/www/sbgs/storage/media
sudo chown -R deploy:deploy /var/www/sbgs/storage
```

| Variable | Where | Example |
|----------|-------|---------|
| `STOREFRONT_URL`, `ADMIN_URL` | `backend/.env` (Phase 1 bootstrap) | `https://<domain>` — **`STOREFRONT_URL` required**; production-like boot fails if missing (password-reset links) |
| `MEDIA_STORAGE_PROVIDER`, `R2_*` | **Ops UI** → Product Media | Not in `backend/.env`; restart API after save |
| `NEXT_PUBLIC_IMAGE_CDN_URL` | `frontend/.env.production.local` | Same hostname as Ops `R2_PUBLIC_BASE_URL` |
| Storefront COD / module flags | **`GET /api/v1/store/config`** (runtime) | No frontend redeploy when admin toggles COD or backend `FEATURE_*` changes |

- Admin uploads: `POST /api/v1/admin/products/:id/images/upload` (multipart batch, max **5 MiB** per file; sort order assigned server-side).
- Public serve: **`MEDIA_STORAGE_PROVIDER=r2`** → images at `R2_PUBLIC_BASE_URL` (Cloudflare CDN). **`local`** → `GET /api/v1/media/products/:productId/:filename`.
- Details: [NEXTJS_FRONTEND_INTEGRATION_GUIDE.md](../../../backend/docs/NEXTJS_FRONTEND_INTEGRATION_GUIDE.md) §7.2, [CLIENT_VPS_SETUP_GUIDE.md](../../../backend/docs/CLIENT_VPS_SETUP_GUIDE.md) §7.

## Frontend production env

See [frontend/.env.production.example](../../../frontend/.env.production.example) on VPS as `.env.production.local` — includes `NEXT_PUBLIC_IMAGE_CDN_URL`, same-origin `NEXT_PUBLIC_API_BASE_URL`; storefront/COD/module flags from `GET /store/config`. Brand logo: `frontend/public/images/sbgs-logo.png` (`BRAND_LOGO_SRC` in `lib/constants.ts`).
