# Git Workflow — Upgrading the Existing Repository

This upgrade is meant to happen on a **new branch** in your existing repo, not a
fresh repository. That's what demonstrates real branching/version-control practice
to your instructor.

## 1. Get your existing repo up to date

```bash
cd path/to/your/existing/profile-site
git checkout main
git pull origin main
```

## 2. Create a feature branch

Use a descriptive branch name — it's part of what graders look for.

```bash
git checkout -b feature/dynamic-upgrade
```

## 3. Copy in the upgraded files

Replace `index.html`, `script.js`, `style.css`, `README.md`, and add the new
`firebase-config.js` and `GIT_WORKFLOW.md` from this delivery into your repo folder.

## 4. Commit in small, meaningful chunks (not one giant commit)

Small, well-labeled commits are exactly what "clean commit history" means on a
rubric. Suggested split:

```bash
git add index.html style.css
git commit -m "feat: add dark/light theme toggle and page loading animation"

git add index.html script.js style.css
git commit -m "feat: add certificates and education/achievement timeline sections"

git add index.html script.js style.css
git commit -m "feat: integrate live GitHub API repository feed"

git add index.html script.js style.css firebase-config.js
git commit -m "feat: connect contact form and guestbook to Firebase Firestore"

git add index.html script.js style.css
git commit -m "feat: add Firestore-backed visitor counter"

git add README.md GIT_WORKFLOW.md
git commit -m "docs: update README and add Git workflow guide for the upgrade"
```

Commit message convention used above:
- `feat:` a new feature
- `fix:` a bug fix
- `docs:` documentation only
- `style:` formatting/CSS-only change
- `refactor:` code change that isn't a new feature or a fix

## 5. Push the branch to GitHub

```bash
git push -u origin feature/dynamic-upgrade
```

## 6. Open a Pull Request

On GitHub, open a PR from `feature/dynamic-upgrade` into `main`. In the PR
description, briefly list what changed (this maps directly to the rubric —
paste the "Rubric Mapping" table from `README.md`). This PR is your evidence of
branching + review practice even if you're merging your own work.

## 7. Merge and clean up

```bash
git checkout main
git pull origin main        # picks up the merge if done on GitHub's UI
git branch -d feature/dynamic-upgrade
git push origin --delete feature/dynamic-upgrade   # optional cleanup
```

## 8. Confirm GitHub Pages redeployed

Push to `main` triggers a redeploy automatically if GitHub Pages is already
configured (Settings → Pages). Give it 1–2 minutes, then reload your live URL.

## Tips for a clean history

- Never commit `node_modules`, editor files, or OS files — add a `.gitignore` if needed.
- Never commit real Firebase secrets to a public repo description as "secret" —
  Firebase **web** API keys are safe to expose publicly (they're restricted by
  Firestore security rules, not by secrecy), but it's still good practice to
  double-check your Firestore rules before submitting, see `firebase-config.js`.
- Keep commits scoped to one concern each so a grader (or future-you) can read
  `git log --oneline` and understand the upgrade story at a glance.
