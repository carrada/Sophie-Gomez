#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="${REPO_NAME:-Sophie-Gomez}"
VERCEL_PROJECT_NAME="${VERCEL_PROJECT_NAME:-sophie-gomez}"
REPO_VISIBILITY="${REPO_VISIBILITY:-private}" # private | public
DOMAIN="${DOMAIN:-sophiegomez.me}"

echo "==> Checking GitHub auth"
gh auth status

if ! git rev-parse HEAD >/dev/null 2>&1; then
  echo "No hay commits. Abortando."
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "==> Remote origin already exists: $(git remote get-url origin)"
else
  echo "==> Creating GitHub repo: $REPO_NAME ($REPO_VISIBILITY)"
  gh repo create "$REPO_NAME" \
    --source=. \
    --remote=origin \
    --"$REPO_VISIBILITY" \
    --push
fi

CURRENT_BRANCH="$(git branch --show-current)"
echo "==> Pushing branch: $CURRENT_BRANCH"
git push -u origin "$CURRENT_BRANCH"

echo "==> Checking Vercel CLI"
if ! command -v vercel >/dev/null 2>&1; then
  echo "vercel CLI no encontrado. Instala con: npm i -g vercel"
  exit 1
fi

echo "==> Linking / deploying on Vercel (follow prompts if needed)"
# Production deploy from current directory; links project on first run
vercel --prod --yes --name "$VERCEL_PROJECT_NAME"

echo "==> Adding domain: $DOMAIN"
# May prompt for DNS confirmation depending on account/domain ownership
vercel domains add "$DOMAIN" || true
vercel alias set "$(vercel ls --prod 2>/dev/null | awk 'NR==2{print $2}')" "$DOMAIN" 2>/dev/null || \
  echo "Alias automático omitido — asigna $DOMAIN en el dashboard de Vercel si hace falta."

echo
echo "Listo."
echo "Repo: $(gh repo view --json url -q .url 2>/dev/null || git remote get-url origin)"
echo "Dominio objetivo: https://$DOMAIN"
echo "DNS: en tu registrador apunta A/CNAME a Vercel (te lo muestra el dashboard)."
