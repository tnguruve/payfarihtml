# Replace payfarihtml repo with this Next.js app

Your current repo (https://github.com/tnguruve/payfarihtml) has one file: `index.html`.  
You want the repo to contain **this whole Next.js app** instead, so Vercel can build and deploy it.

## Option A: Replace via terminal (recommended)

Run these in your terminal. Replace `payfarihtml` with your repo path if different.

```bash
# 1. Clone the GitHub repo (if you don’t have it yet)
git clone https://github.com/tnguruve/payfarihtml.git payfarihtml-replace
cd payfarihtml-replace

# 2. Remove the old content (keep .git)
git rm -rf .
git clean -fdx
# Keep .git: do NOT delete the .git folder

# 3. Copy this Next.js app into the repo (all files except .git and node_modules)
# From the waitlist-landing folder, copy everything into payfarihtml-replace:
cp -r /Users/tinodiwanashenguruve/payfari/waitlist-landing/* .
cp /Users/tinodiwanashenguruve/payfari/waitlist-landing/.env.example . 2>/dev/null || true
cp /Users/tinodiwanashenguruve/payfari/waitlist-landing/.nvmrc . 2>/dev/null || true

# 4. Don’t commit secrets or build artifacts
echo "node_modules\n.next\n.env.local" >> .gitignore

# 5. Commit and push
git add .
git commit -m "Replace with Next.js PayFari waitlist landing"
git push origin main
```

After pushing, Vercel will redeploy waitlist.payfari.com from the new code.  
In Vercel → Project → Settings → Environment Variables, add:

- **Name:** `WAITLIST_FORM_URL`  
- **Value:** `https://app.kit.com/forms/8974776/subscriptions`

Then trigger a redeploy if it doesn’t start automatically.

## Option B: New repo, then point Vercel at it

1. Create a new GitHub repo (e.g. `payfari-waitlist-next`).
2. Copy the full contents of `payfari/waitlist-landing` into it (no `node_modules` or `.next`).
3. Push to GitHub.
4. In Vercel: Project → Settings → Git → disconnect current repo, connect the new repo.
5. Add `WAITLIST_FORM_URL` as above and redeploy.

---

**Summary:** You’re not “replacing a file with a folder” in the GitHub UI—you replace the **contents of the repo** from your machine: delete the old files, add the whole Next.js app folder’s contents, commit, and push.
