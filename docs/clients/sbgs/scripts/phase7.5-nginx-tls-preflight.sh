#!/usr/bin/env bash
# Phase 7.5 — Multi-client VPS preflight (Sri Sai Baba Ghee Sweets)
set -euo pipefail

export CLIENT_ID="${CLIENT_ID:-sbgs}"
export PRODUCTION_DOMAIN="${PRODUCTION_DOMAIN:-srisaibabasweets.com}"
export BACKEND_PORT="${BACKEND_PORT:-3001}"
export STOREFRONT_PORT="${STOREFRONT_PORT:-3101}"
export BACKEND_PATH="${BACKEND_PATH:-/var/www/sbgs/backend}"
export NGINX_SITE_NAME="${NGINX_SITE_NAME:-srisaibabasweets.com}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
exec bash "${REPO_ROOT}/backend/docs/templates/scripts/phase7.5-nginx-tls-preflight.sh"
