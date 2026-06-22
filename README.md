# John Carlo M. Gayo — Personal Profile Website

A modern, responsive personal portfolio website for **John Carlo M. Gayo**, a BS Computer Science student. Built with **pure HTML, CSS, and JavaScript** — no frameworks, no build tools, no API keys required.

🔗 Live demo (after publishing): `https://<your-username>.github.io/<repo-name>/`

---

## ✨ Features

- Dark theme with blue/cyan accent palette
- Fully responsive (mobile, tablet, desktop)
- Sticky, blur-backed navbar with active-section highlighting
- Smooth scrolling navigation
- Animated hero with typing terminal effect
- Scroll-reveal animations on all sections
- Animated, scroll-triggered skill bars
- Filterable project gallery (All / Web / AI-Prediction / Database)
- Scroll-to-top button
- Contact cards (Email, Phone, Facebook, GitHub, LinkedIn)
- **Local AI chatbot** — a rule-based assistant that answers questions about John's profile, skills, education, and projects entirely in the browser, with **no external API or API key needed**
- Accessible focus states + `prefers-reduced-motion` support

---

## 📁 Project Structure

```
profile-site/
├── index.html      # Page structure & content (all 7 sections)
├── style.css       # Dark theme styling, layout, animations
├── script.js       # Navigation, animations, filtering, chatbot logic
└── README.md       # This file
```

---

## 🛠️ Tech Used

- HTML5
- CSS3 (custom properties, Grid, Flexbox, keyframe animations)
- Vanilla JavaScript (IntersectionObserver, DOM events)
- [Font Awesome](https://fontawesome.com/) (icons, via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono

No npm install, no build step — just static files.

---

## ▶️ Running Locally

1. Download/clone the project folder.
2. Open `index.html` directly in your browser, **or** serve it locally for the best experience:
   ```bash
   # Python 3
   python -m http.server 8000
   # then visit http://localhost:8000
   ```
3. That's it — everything (including the chatbot) runs client-side.

---

## 🤖 About the AI Chatbot

The chatbot widget (bottom-right corner) is a **local, rule-based assistant**:

- It uses a small JavaScript "knowledge base" object (`profile`) containing John's skills, projects, education, and contact info.
- User messages are matched against keyword **intents** (e.g. "skills", "project", "contact").
- The best-matching response is returned instantly — no network request, no API key, no internet connection required.
- Try the quick-reply buttons, or type questions like:
  - "What skills do you have?"
  - "Tell me about the Rice Yield Prediction System"
  - "What's your education?"
  - "How can I contact you?"

You can extend its knowledge by editing the `profile` object and `rules` array inside `script.js`.

---

## 🧰 Development Notes

- Local development server (used during debugging in this repo):
   ```bash
   # serve from project root on port 5500
   python -m http.server 5500
   # then visit http://localhost:5500
   ```
- Recent changes made for stability before publishing:
   - Removed the hero typing animation to avoid a distracting auto-typing line.
   - Added defensive checks and error handling around the chatbot initialization so the page won't break if elements are missing.
   - Removed temporary debug logs from `script.js`.

- Quick checklist before pushing to GitHub:
   ```bash
   git add .
   git commit -m "chore: stabilize chatbot; remove typing animation"
   git push
   ```


---

## 🚀 Uploading to GitHub

1. **Create a new repository** on GitHub (e.g. `personal-profile-website`). Do **not** initialize it with a README (you already have one).
2. On your computer, open a terminal inside the `profile-site` folder.
3. Initialize Git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: personal profile website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. Refresh your GitHub repository page — your files should now appear there.

> Replace `<your-username>` and `<repo-name>` with your actual GitHub username and the repository name you created.

---

## 🌐 Publishing with GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar, under "Code and automation").
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
5. Wait about 1–2 minutes, then refresh the Pages settings screen — you'll see a green banner with your live URL:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
6. Visit that link — your personal profile website is now live for anyone to see!

> Tip: Every time you `git push` new changes to the `main` branch, GitHub Pages will automatically redeploy the updated site within a minute or two.

---

## 📄 License

This project is free to use and modify for personal portfolio purposes.

---

© 2026 John Carlo M. Gayo. All Rights Reserved.
