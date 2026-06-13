# GitHub CD — Sri Sai Baba Ghee Sweets

> **Canonical guide (all clients):** [backend/docs/GITHUB_CD_SELF_HOSTED_RUNNER_GUIDE.md](../../../backend/docs/GITHUB_CD_SELF_HOSTED_RUNNER_GUIDE.md)  
> **Onboarding phase:** [CLIENT_ONBOARDING_EXECUTION_ORDER.md](../../../backend/docs/CLIENT_ONBOARDING_EXECUTION_ORDER.md) — Phase 7.6  
> **VPS summary:** [backend/docs/CLIENT_VPS_SETUP_GUIDE.md](../../../backend/docs/CLIENT_VPS_SETUP_GUIDE.md) §22

---

## Client identity

| Field | Value |
|-------|-------|
| GitHub repo | `https://github.com/bb3agency/sbgs-site` |
| `CLIENT_ID` | `sbgs` |
| VPS IP | `178.104.46.202` |
| Deploy user | `d_user` |
| Runner name / label | `sbgs-vps` |
| Monorepo path | `/var/www/sbgs` |
| Runner install dir | `/home/d_user/actions-runner-sbgs` |

---

## GitHub repository configuration

### Variables

| Name | Value |
|------|-------|
| `VPS_DEPLOY_ENABLED` | `true` |
| `VPS_RUNNER_LABEL` | `sbgs-vps` |
| `FRONTEND_DEPLOY_ENABLED` | `true` |

### Secrets

| Name | Value |
|------|-------|
| `VPS_CLIENT_PATH` | `/var/www/sbgs/backend` |
| `VPS_FRONTEND_PATH` | `/var/www/sbgs/frontend` |

---

## `CLIENT_ID` format (important)

- Preferred format is a slug: lowercase letters, numbers, and hyphens only (example: `sbgs`).
- Spaces are not used directly in runner names/paths.
- Installer scripts now normalize automatically:
  - `Sri Sai Baba Ghee Sweets` -> `sbgs`
  - `sbgs` -> `sbgs`
  - `SBGS   ORGANICS` -> `sbgs`
- Resulting runner defaults:
  - directory: `~/actions-runner-sbgs`
  - name/label: `sbgs-vps`

---

## VPS runner (one-time) — **required for push-to-deploy**

If `verify-cd-status.sh` shows **`[FAIL] No runner`**, auto-deploy will **never** run until this step is done.

Runner directory is **`~/actions-runner-sbgs`** (not generic `~/actions-runner`) so multiple clients on one VPS stay isolated.

### Option A — guided installer (recommended)

1. GitHub → [bb3agency/sbgs-site → Settings → Actions → Runners → New self-hosted runner](https://github.com/bb3agency/sbgs-site/settings/actions/runners/new)
2. Choose **Linux** / **x64** — copy the **download URL** and **token** (token expires in ~1 hour).
3. On VPS:

```bash
ssh d_user@178.104.46.202
cd /var/www/sbgs
git pull origin main   # get install-github-runner.sh if needed

export RUNNER_TOKEN='<paste-token>'
export RUNNER_DOWNLOAD_URL='<paste-curl-url-from-github>'
bash docs/clients/sbgs/scripts/install-github-runner.sh
```

### Option B — manual

```bash
ssh d_user@178.104.46.202
mkdir -p ~/actions-runner-sbgs && cd ~/actions-runner-sbgs
# GitHub → bb3agency/sbgs-site → Settings → Actions → Runners → New
curl -o actions-runner-linux-x64.tar.gz -L <URL_FROM_GITHUB>
tar xzf ./actions-runner-linux-x64.tar.gz
./config.sh \
  --url https://github.com/bb3agency/sbgs-site \
  --token <TOKEN> \
  --name "sbgs-vps" \
  --labels "self-hosted,sbgs-vps" \
  --unattended
sudo ./svc.sh install && sudo ./svc.sh start
```

### Already installed at `~/actions-runner`? (one-time rename)

```bash
bash /var/www/sbgs/docs/clients/sbgs/scripts/migrate-runner-directory.sh
```

**Verify:** Runners page shows **sbgs-vps** as **Idle** (green).

Preflight after install: `bash /var/www/sbgs/docs/clients/sbgs/scripts/verify-cd-status.sh`

---

## Workflows (monorepo)

Must exist on `main` at **repository root**:

- `.github/workflows/reliability-ci.yml`
- `.github/workflows/deploy.yml`

Deploy scripts: `backend/scripts/vps-deploy.sh`, `backend/scripts/vps-frontend-deploy.sh`

---

## Test + daily use

```bash
git push origin main
# Actions: Reliability CI → Deploy to VPS (runner sbgs-vps)
```

After setup, every deploy is: **commit → push to `main` → automatic**.

> **PM2 does not watch git.** Push-to-deploy is **not** PM2 — it is the **GitHub Actions self-hosted runner** on the VPS running `vps-deploy.sh` / `vps-frontend-deploy.sh` (git pull + docker/pm2 reload).

### If backend deploy fails on `/health/ready` (`PAYMENT_PROVIDER`, `SHIPPING_PROVIDER`, `SMS_PROVIDER`)

This is **expected** until Phase 8 Ops config is complete. CD is working; the deploy script refuses to finish while go-live keys are missing.

1. Log in: `https://srisaibabasweets.com/ops/login` → **Config**
2. Set provider modes (and their API keys) in the Ops DB overlay — not in `backend/.env`:
   - `PAYMENT_PROVIDER` = `razorpay` (plus Razorpay keys) or `cod`
   - `SHIPPING_PROVIDER` = `delhivery` or `shiprocket` (plus provider keys)
   - `SMS_PROVIDER` = `msg91` or `fast2sms` (plus SMS keys), or `noop` only for non-production testing
3. Also fill strict go-live keys when prompted: `OPS_METRICS_TOKEN`, `REPLAY_APPROVAL_TOKEN`, webhook allowlists, etc.
4. **Save** config (OTP if required) → **restart API + workers** when UI shows restart required:
   ```bash
   cd /var/www/sbgs/backend
   docker compose -p sbgs -f docker-compose.yml -f docker-compose.prod.yml restart backend workers
   ```
5. Verify on VPS:
   ```bash
   curl -s http://127.0.0.1:3002/api/v1/health/ready
   ```
   Must show `"status":"ready"` and `"runtimeConfigMissingKeys":[]`.
6. Re-run **Deploy to VPS** (or push again).

See [PRODUCTION_FIRST_DEPLOY_CHECKLIST.md](../../../backend/docs/PRODUCTION_FIRST_DEPLOY_CHECKLIST.md) Phase 2.

### If backend deploy fails on Prisma (`npx: not found` or `EACCES` on `.prisma/client`)

- Production images remove `npm`/`npx` — do not run `prisma generate` inside the running container.
- Prisma client is generated during `docker compose build` (Dockerfile builder stage).
- Migrations run on the **host** via `node_modules/.bin/prisma` after `npm ci`.
- Pull latest `main` so `vps-deploy.sh` matches this flow, then re-run **Deploy to VPS**.

### If push did not redeploy frontend

Check these in order:

1. **Reliability CI must be green** on the same commit (`Deploy to VPS` is gated by CI success).
2. **Deploy workflow must run on `main`** (push to other branches will not auto-deploy).
3. In GitHub Actions, confirm `Deploy Frontend to Hetzner VPS` is not skipped:
   - `VPS_DEPLOY_ENABLED=true`
   - `FRONTEND_DEPLOY_ENABLED=true`
   - secrets `VPS_CLIENT_PATH` + `VPS_FRONTEND_PATH` exist
4. On VPS, check whether frontend deploy ever succeeded:
   - `cat /var/www/sbgs/frontend/.last-frontend-deploy-sha`
5. If missing or stale, trigger once manually:
   - GitHub -> Actions -> `Deploy to VPS` -> `Run workflow`
   - or run manual command from this doc.

### Incident closure summary (2026-05-24)

- **Deploy skipped/no-op after push:** repo Variables/Secrets were not configured.
- **Deploy failed with missing secrets:** `VPS_CLIENT_PATH` / `VPS_FRONTEND_PATH` were set as Variables (fixed: moved to Secrets).
- **Backend failed with `npx: not found` then Prisma `EACCES`:** deploy script no longer runs Prisma generate inside runtime container; migrations run on host and Prisma client is generated during image build.
- **Backend failed at readiness:** not a CD failure; Ops runtime config incomplete. Complete Phase 8 Ops Config until `/api/v1/health/ready` returns `status=ready` and `runtimeConfigMissingKeys: []`.

---

## Verify CD is working (VPS)

SSH as `d_user` and run:

```bash
bash /var/www/sbgs/docs/clients/sbgs/scripts/verify-cd-status.sh
```

| Check | What PASS means |
|-------|-----------------|
| Git `local HEAD` = `origin/main` | VPS has latest code from GitHub |
| Runner service running | Deploy jobs can execute on VPS |
| PM2 `sbgs-frontend` | Frontend process exists |
| Docker `sbgs-backend` | API container running |

**GitHub (browser):** [Actions](https://github.com/bb3agency/sbgs-site/actions)

1. **Reliability CI** — must be green on your commit (deploy does **not** run if CI fails).
2. **Deploy to VPS** — two jobs: `Deploy Backend` + `Deploy Frontend`, both on runner `sbgs-vps`.

**Quick test after a push:**

```bash
# On VPS — should match your latest commit on GitHub
git -C /var/www/sbgs rev-parse --short HEAD
git -C /var/www/sbgs rev-parse --short origin/main
cat /var/www/sbgs/frontend/.last-frontend-deploy-sha 2>/dev/null || echo "no frontend CD yet"
cat /var/www/sbgs/frontend/.last-frontend-build-sha 2>/dev/null || echo "no frontend build yet"
```

**Manual deploy (no new commit):** GitHub → Actions → **Deploy to VPS** → **Run workflow**.

**Manual frontend only on VPS** (git sync + `npm run build` + pm2 reload — not `git pull` alone):

```bash
bash /var/www/sbgs/site/docs/clients/sbgs/scripts/phase10-frontend-deploy.sh
# Or:
# bash /var/www/sbgs/backend/scripts/vps-frontend-deploy.sh \
#   /var/www/sbgs/frontend "$(git -C /var/www/sbgs rev-parse HEAD)"
# Backend-only push (skip build — rare):
# SKIP_FRONTEND_BUILD=true bash .../vps-frontend-deploy.sh ...
```

---

## Cleared

| Field | Value |
|-------|-------|
| Runner Online date | |
| First green CD deploy SHA | |
| Verified by | |
