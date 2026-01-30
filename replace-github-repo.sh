#!/bin/bash
# Replace https://github.com/tnguruve/payfarihtml with this Next.js app
# Run from: payfari/waitlist-landing (or run with full paths)

set -e
REPO_URL="https://github.com/tnguruve/payfarihtml.git"
REPO_DIR="payfarihtml-replace"
SOURCE_DIR="${1:-/Users/tinodiwanashenguruve/payfari/waitlist-landing}"

echo "→ Cloning repo..."
rm -rf "$REPO_DIR"
git clone "$REPO_URL" "$REPO_DIR"
cd "$REPO_DIR"

echo "→ Removing old files..."
git rm -rf . 2>/dev/null || true
git clean -fd
ls .git >/dev/null 2>&1 || { echo "Error: .git missing"; exit 1; }

echo "→ Copying Next.js app (excluding node_modules, .next, .env.local)..."
rsync -a --exclude='node_modules' --exclude='.next' --exclude='.env.local' --exclude='.git' "$SOURCE_DIR/" .

echo "→ Ensuring .gitignore excludes large files..."
grep -q "public/services/\*.zip" .gitignore 2>/dev/null || echo "public/services/*.zip" >> .gitignore

echo "→ Increasing Git buffer for large push..."
git config http.postBuffer 524288000

echo "→ Staging and committing..."
git add .
git status
git commit -m "Replace with Next.js PayFari waitlist landing" || true

echo "→ Pushing to main..."
git push origin main

echo "Done. Update Vercel env: WAITLIST_FORM_URL=https://app.kit.com/forms/8974776/subscriptions"
echo "Repo: https://github.com/tnguruve/payfarihtml"
