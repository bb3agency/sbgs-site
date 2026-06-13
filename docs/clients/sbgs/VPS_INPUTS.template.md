# VPS inputs — Sri Sai Baba Ghee Sweets (template)

Copy to `VPS_INPUTS.md` (gitignored) and fill before VPS deploy.

See [README.md](./README.md) for execution order.

| Field | Value |
|-------|-------|
| `PRODUCTION_DOMAIN` | `srisaibabasweets.com` |
| `DNS_PROVIDER` | Cloudflare (nameservers at Namecheap) |
| `IMAGE_CDN_HOST` | `cdn.srisaibabasweets.com` |
| `VPS_IP` | |
| `DEPLOY_USER` | |
| `GIT_REPO_URL` | |

Ports: `BACKEND_PORT=3002`, `STOREFRONT_PORT=3102`, `CLIENT_ID=sbgs`

## Cloudflare R2 (Ops UI — Product Media)

Non-secret values: [CLOUDFLARE_R2_MEDIA.md](./CLOUDFLARE_R2_MEDIA.md). Store `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` only in the filled `VPS_INPUTS.md` vault — never commit.

## Razorpay (Ops UI — Payments)

Runbook: [RAZORPAY_PAYMENTS_SETUP.md](./RAZORPAY_PAYMENTS_SETUP.md). Store `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` only in the filled `VPS_INPUTS.md` vault.

| Field | Value |
|-------|-------|
| `PAYMENT_PROVIDER` | `razorpay` |
| `RAZORPAY_KEY_ID` | |
| `RAZORPAY_KEY_SECRET` | |
| `RAZORPAY_WEBHOOK_SECRET` | generate 32+ char random; same in Razorpay webhook + Ops UI |
| Webhook URL | `https://<domain>/api/v1/payments/webhook` |
| Webhook events | `payment.captured`, `payment.failed`, `refund.processed` |

## Shiprocket (Ops UI — Shipping)

| Field | Value |
|-------|-------|
| `SHIPPING_PROVIDER` | `shiprocket` |
| `SHIPROCKET_EMAIL` | |
| `SHIPROCKET_PASSWORD` | |
| `SHIPROCKET_PICKUP_PINCODE` | warehouse pincode |
| `SHIPROCKET_PICKUP_LOCATION` | pickup nickname in Shiprocket dashboard (default `Primary`) |
| `SHIPROCKET_WEBHOOK_TOKEN` | |
| Webhook URL | `https://<domain>/api/v1/shipping/webhook` |
