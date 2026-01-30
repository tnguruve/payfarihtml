# Work in this folder → push to GitHub → Vercel

Run these **once** in your terminal so this folder (`waitlist-landing`) is the same repo as GitHub/Vercel.

## 1. Go into this folder
```bash
cd /Users/tinodiwanashenguruve/payfari/waitlist-landing
```

## 2. Make this folder its own Git repo connected to payfarihtml
```bash
# Remove parent git’s link to this folder (so this can be its own repo)
rm -rf .git 2>/dev/null

# Start fresh Git here
git init
git branch -M main
git remote add origin https://github.com/tnguruve/payfarihtml.git

# Match GitHub (same code you already pushed)
git fetch origin
git reset --hard origin/main
```

## 3. From now on: work here and push
- Edit code in **payfari/waitlist-landing** (this folder).
- Run locally: `npm run dev`
- When ready to go live:
  ```bash
  cd /Users/tinodiwanashenguruve/payfari/waitlist-landing
  git add .
  git commit -m "Describe your change"
  git push origin main
  ```
- Vercel will deploy from GitHub.

One folder = your app + Git → GitHub → Vercel.
