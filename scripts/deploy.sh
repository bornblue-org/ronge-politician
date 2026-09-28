#!/usr/bin/env bash
# Pulls latest code and redeploys. Run on the VPS from the project root.
set -euo pipefail
cd "$(dirname "$0")/.."

./scripts/backup-db.sh

git pull
docker compose up -d --build
docker compose ps
