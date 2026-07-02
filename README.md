# John Carlo M. Gayo — Personal Profile Website (Dynamic Upgrade)

A modern, **dynamic** portfolio for **John Carlo M. Gayo**, BS Computer Science
student — upgraded from a static HTML/CSS/JS site into one backed by a live
database, a live GitHub feed, and data-driven UI, while staying framework-free.

🔗 Live demo (after publishing): `https://<your-username>.github.io/<repo-name>/`

---

## ✨ What's new in this upgrade

| Feature | Powered by |
|---|---|
| Dark / Light mode toggle (persisted) | CSS custom properties + `localStorage` |
| Page loading animation | CSS + JS |
| Typing animation in the hero | Vanilla JS, `prefers-reduced-motion`-aware |
| Certificates section | Data array in `script.js` → rendered UI |
| Education + Achievement timeline | Data array in `script.js` → rendered UI |
| Live GitHub repositories | GitHub REST API (`fetch`, no key needed) |
| Contact form | Firebase Firestore (`messages` collection) |
| Live guestbook | Firebase Firestore (`guestbook` collection, real-time listener) |
| Visitor counter | Firebase Firestore (`stats/visitors`, atomic increment) |
| Scroll-reveal animations | AOS (Animate On Scroll) + existing IntersectionObserver |
| Utility styling for new components | Tailwind CSS (via CDN, `preflight` disabled so it layers on top of the existing design system instead of resetting it) |
| Local AI chatbot | Unchanged — rule-based, fully offline |

Everything still runs from static files with **no build step**. Firebase is the
only external service, and the site works (with a friendly setup notice) even
before you connect it.

---

## 📁 Project Structure

```
profile-site/
├── index.html            # Page structure & content (all sections)
├── style.css              # Design tokens, dark/light theme, layout, components
├── script.js               # All interactivity: nav, animations, filtering,
│                            #   certificates, timeline, GitHub feed, forms,
│                            #   guestbook, visitor counter, chatbot
├── firebase-config.js      # Your Firebase project credentials + setup notes
├── GIT_WORKFLOW.md         # Branching / commit / PR guide for this upgrade
├── README.md               # This file
└── assets/
    ├── carlo.jpg                        # Profile photo (hero)
    └── John-Carlo-Gayo-Resume.pdf       # Resume file served by the download button
```

**Why this structure:** everything a browser needs sits at the repo root so
GitHub Pages can serve it with zero configuration — no `dist/`, no bundler
output, no server. `firebase-config.js` is kept as its own file (rather than
inlined) so credentials are easy to find, swap, and explain in a code review.

---

## 🛠️ Tech Stack

- **HTML5** — semantic sections
- **CSS3** — custom properties (design tokens), Grid, Flexbox, keyframes, a light/dark theme
- **Tailwind CSS** (CDN) — utility classes for new component layout, `preflight` disabled
- **Vanilla JavaScript (ES6+)** — `fetch`, `async/await`, `IntersectionObserver`, modules-by-function
- **AOS** — declarative scroll animations (`data-aos="fade-up"`, etc.)
- **Firebase Firestore** — NoSQL cloud database for contact messages, guestbook, visitor count
- **GitHub REST API** — live repository data, no auth required for public repos
- **Font Awesome** — icons
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono

No `npm install`, no build step — open `index.html` or serve statically.

---

## ▶️ Running Locally

```bash
# from the project folder
python -m http.server 8000
# visit http://localhost:8000
```

The site works without Firebase configured — the contact form, guestbook, and
visitor counter show a plain-language "connect Firebase" notice instead of
breaking.

---

## 🔥 Connecting Firebase (5 minutes)

1. Create a free project at [console.firebase.google.com](https://console.firebase.google.com).
2. Register a **Web app** (the `</>` icon) inside that project.
3. Copy the `firebaseConfig` object it gives you into `firebase-config.js`,
   replacing the placeholder values.
4. In the console: **Build → Firestore Database → Create database** → start in
   test mode.
5. Reload the site. The contact form, guestbook, and visitor counter now read
   and write real data.
6. Before treating this as production-ready for the public, tighten the
   Firestore security rules — a starting-point rule set is included as a
   comment at the bottom of `firebase-config.js`.

---

## 🤖 About the AI Chatbot

Unchanged from the original build: a **local, rule-based assistant** using a
small JavaScript knowledge-base object matched against keyword intents — no
network request, no API key. See `initChatbot()` in `script.js` to extend it.

---

## 🚀 Git Branching, Commits & Deployment

See **[GIT_WORKFLOW.md](./GIT_WORKFLOW.md)** for the full step-by-step guide:
creating a feature branch, committing in meaningful chunks, opening a pull
request, merging, and confirming GitHub Pages redeploys.

Quick reference:

```bash
git checkout -b feature/dynamic-upgrade
git add .
git commit -m "feat: describe one change at a time"
git push -u origin feature/dynamic-upgrade
# open a PR on GitHub, then merge into main
```

## 🌐 Publishing with GitHub Pages

1. Repository → **Settings → Pages**.
2. **Build and deployment → Source:** Deploy from a branch.
3. **Branch:** `main`, folder `/ (root)` → **Save**.
4. Wait 1–2 minutes, refresh — your live URL appears.
5. Every push to `main` redeploys automatically within a minute or two.

---

## 🎓 Rubric Mapping

| Rubric criterion | How this upgrade satisfies it |
|---|---|
| **Version Control** | Feature branch, scoped commits, PR/merge flow — see `GIT_WORKFLOW.md` |
| **Modern Tech Stack** | Tailwind CDN, AOS, Firebase Firestore SDK, GitHub REST API, ES6+ JS |
| **Database / Cloud Storage** | Firestore collections: `messages`, `guestbook`, `stats` |
| **Dynamic Functionality** | Live GitHub feed, live guestbook (real-time listener), Firestore-backed counter, data-driven certificate/timeline rendering |
| **Responsive Design** | Existing mobile-first CSS extended to all new sections; nav breakpoint adjusted for the added links |
| **Professional UI/UX** | Consistent design tokens, dark/light theme, scroll reveals, loading state, accessible focus states |
| **Clean Project Structure** | Flat static-site layout, single-purpose files, documented above |
| **Originality** | Content, data, and copy specific to John's real profile and projects, not placeholder text |
| **Real-World Practices** | Environment-style config file, graceful degradation when Firebase isn't configured, security-rules starting point, semantic commit messages |

---

## 📄 License

Free to use and modify for personal portfolio purposes.

---

© 2026 John Carlo M. Gayo. All Rights Reserved.
"# John-Carlo-Gayo-Personal-Profile"
