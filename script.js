/* =============================================================
   PERSONAL PROFILE WEBSITE — script.js
   John Carlo M. Gayo
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------------------
     0. PAGE LOADING ANIMATION
  ----------------------------------------------------------- */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("done");
      setTimeout(() => preloader.remove(), 600);
    });
    // Safety net: never let the preloader trap the user if 'load' is slow/blocked
    setTimeout(() => preloader.classList.add("done"), 4000);
  }

  /* -----------------------------------------------------------
     0b. DARK / LIGHT THEME TOGGLE (persisted in localStorage)
  ----------------------------------------------------------- */
  (function initThemeToggle() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("themeToggle");
    const moonIcon = document.getElementById("themeIconMoon");
    const sunIcon = document.getElementById("themeIconSun");
    if (!toggleBtn) return;

    const saved = localStorage.getItem("jcmg-theme");
    if (saved === "light") applyTheme("light");

    function applyTheme(mode) {
      if (mode === "light") {
        root.setAttribute("data-theme", "light");
        if (moonIcon) moonIcon.style.display = "none";
        if (sunIcon) sunIcon.style.display = "";
      } else {
        root.removeAttribute("data-theme");
        if (moonIcon) moonIcon.style.display = "";
        if (sunIcon) sunIcon.style.display = "none";
      }
      localStorage.setItem("jcmg-theme", mode);
    }

    toggleBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      applyTheme(isLight ? "dark" : "light");
    });
  })();

  /* -----------------------------------------------------------
     1. STICKY NAVBAR + ACTIVE LINK ON SCROLL
  ----------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function handleScrollEffects() {
    // Sticky navbar background
    navbar.classList.toggle("scrolled", window.scrollY > 30);

    // Active link highlight
    let currentSection = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentSection = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === `#${currentSection}`
      );
    });

    // Scroll-to-top button visibility
    if (scrollTopBtn) scrollTopBtn.classList.toggle("show", window.scrollY > 400);
  }

  window.addEventListener("scroll", handleScrollEffects);
  handleScrollEffects();

  /* -----------------------------------------------------------
     2. MOBILE NAV TOGGLE
  ----------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinksWrap = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinksWrap.classList.toggle("open");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinksWrap.classList.remove("open");
    })
  );

  /* -----------------------------------------------------------
     3. SCROLL TO TOP BUTTON
  ----------------------------------------------------------- */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------------------
     4. HERO TYPED TEXT EFFECT
     A short, finite typewriter that cycles through a few roles
     then stops on the last one — intentionally brief so it reads
     as a detail, not a distraction. Respects reduced-motion.
  ----------------------------------------------------------- */
  (function initTypedRoles() {
    const typedTextEl = document.getElementById("typedText");
    const cursorEl = document.querySelector(".cursor");
    if (!typedTextEl) return;

    const roles = ["Aspiring Software Developer", "Database Enthusiast", "AI & Web Builder"];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      typedTextEl.textContent = roles[0];
      if (cursorEl) cursorEl.style.display = "none";
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedTextEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          // Pause on completed word
          if (roleIndex === roles.length - 1) return; // stop on the final role
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typedTextEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex++;
        }
      }
      setTimeout(tick, deleting ? 35 : 55);
    }

    setTimeout(tick, 500);
  })();

  /* -----------------------------------------------------------
     5. SCROLL REVEAL + ANIMATED SKILL BARS (IntersectionObserver)
  ----------------------------------------------------------- */
  // Tag elements for generic reveal animation
  document
    .querySelectorAll(
      ".about-card, .skill-card, .project-card, .education-card, .contact-card, .section-title, .eyebrow, .certificate-card, .timeline-item, .github-card, .contact-form-wrap, .guestbook-wrap"
    )
    .forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // Animate skill bars when skills section is visible
  const skillFills = document.querySelectorAll(".skill-fill");
  const skillsSection = document.getElementById("skills");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillFills.forEach((fill) => {
            fill.style.width = fill.getAttribute("data-width") + "%";
          });
          skillObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  if (skillsSection) skillObserver.observe(skillsSection);

  /* -----------------------------------------------------------
     6. PROJECT FILTERING
  ----------------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category");
        const match = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden-card", !match);
      });
    });
  });

  /* -----------------------------------------------------------
     7. AI CHATBOT (LOCAL, RULE-BASED — NO API KEY REQUIRED)
  ----------------------------------------------------------- */
  initChatbot();

  /* -----------------------------------------------------------
     8. NEW DYNAMIC MODULES
  ----------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({ duration: 600, once: true, offset: 60 });
  }

  renderCertificates();
  renderTimeline();
  fetchGitHubRepos("johncarlogayo");
  initContactForm();
  initGuestbook();
  initVisitorCounter();
});

/* =============================================================
   CERTIFICATES — data-driven grid
   Add a new object here and a card renders automatically.
   ============================================================= */
function renderCertificates() {
  const grid = document.getElementById("certificatesGrid");
  if (!grid) return;

  const certificates = [
    {
      title: "Introduction to Database Design",
      issuer: "Coursera",
      date: "2025",
      icon: "fa-solid fa-database",
    },
    {
      title: "Python for Data Analysis",
      issuer: "Coursera",
      date: "2025",
      icon: "fa-brands fa-python",
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2024",
      icon: "fa-solid fa-laptop-code",
    },
    {
      title: "Git & GitHub Essentials",
      issuer: "GitHub Skills",
      date: "2024",
      icon: "fa-brands fa-github",
    },
  ];

  grid.innerHTML = certificates
    .map(
      (c) => `
      <div class="certificate-card">
        <i class="${c.icon} cert-icon"></i>
        <h3>${c.title}</h3>
        <p class="cert-issuer">${c.issuer} · ${c.date}</p>
      </div>`
    )
    .join("");
}

/* =============================================================
   TIMELINE — education + achievement milestones, one data source
   ============================================================= */
function renderTimeline() {
  const list = document.getElementById("timelineList");
  if (!list) return;

  const milestones = [
    { year: "2023", type: "education", title: "Started BS Computer Science", desc: "Began the BS Computer Science program, focusing on programming fundamentals and discrete math." },
    { year: "2024", type: "achievement", title: "First full-stack project shipped", desc: "Built and deployed the SKionix Barangay Management System for a local case study." },
    { year: "2025", type: "achievement", title: "Explored applied AI", desc: "Developed the Rice Yield and Student Performance prediction systems using Python." },
    { year: "2025", type: "education", title: "Advanced to 3rd Year", desc: "Moved into database systems, software engineering, and AI fundamentals coursework." },
    { year: "2026", type: "achievement", title: "Upgraded this portfolio", desc: "Rebuilt the site with live data, a Firestore backend, and GitHub-driven content." },
  ];

  list.innerHTML = milestones
    .map(
      (m) => `
      <div class="timeline-item">
        <div class="timeline-dot ${m.type}"></div>
        <div class="timeline-content">
          <span class="timeline-year">${m.year}</span>
          <span class="timeline-tag ${m.type}">${m.type === "education" ? "Education" : "Achievement"}</span>
          <h3>${m.title}</h3>
          <p>${m.desc}</p>
        </div>
      </div>`
    )
    .join("");
}

/* =============================================================
   GITHUB API — live repositories
   ============================================================= */
async function fetchGitHubRepos(username) {
  const container = document.getElementById("githubRepos");
  if (!container) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );
    if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
    const repos = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = `<p class="github-empty">No public repositories found yet for @${username}.</p>`;
      return;
    }

    container.innerHTML = repos
      .map(
        (r) => `
        <a class="github-card" href="${r.html_url}" target="_blank" rel="noopener">
          <div class="github-card-head">
            <i class="fa-solid fa-code-branch"></i>
            <h3>${r.name}</h3>
          </div>
          <p>${r.description ? r.description : "No description provided."}</p>
          <div class="github-card-meta">
            ${r.language ? `<span><i class="fa-solid fa-circle-dot"></i> ${r.language}</span>` : ""}
            <span><i class="fa-regular fa-star"></i> ${r.stargazers_count}</span>
            <span><i class="fa-solid fa-code-fork"></i> ${r.forks_count}</span>
          </div>
        </a>`
      )
      .join("");
  } catch (err) {
    console.warn("GitHub API fetch failed:", err);
    container.innerHTML = `<p class="github-empty">Couldn't load live repositories right now (rate limit or offline). Visit <a href="https://github.com/${username}" target="_blank" rel="noopener">github.com/${username}</a> directly.</p>`;
  }
}

/* =============================================================
   CONTACT FORM — writes to Firestore "messages" collection
   ============================================================= */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!window.db) {
      status.textContent =
        "Firebase isn't connected yet — add your project's config to firebase-config.js to enable this form.";
      status.className = "form-status warn";
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    if (!name || !email || !message) return;

    submitBtn.disabled = true;
    status.textContent = "Sending…";
    status.className = "form-status";

    try {
      await window.db.collection("messages").add({
        name,
        email,
        message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      status.textContent = "Message sent — thank you! I'll get back to you soon.";
      status.className = "form-status success";
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      status.textContent = "Something went wrong sending your message. Please try again.";
      status.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* =============================================================
   GUESTBOOK — live Firestore read + write
   ============================================================= */
function initGuestbook() {
  const form = document.getElementById("guestbookForm");
  const status = document.getElementById("guestStatus");
  const submitBtn = document.getElementById("guestSubmitBtn");
  const listEl = document.getElementById("guestbookList");
  if (!form || !listEl) return;

  if (!window.db) {
    listEl.innerHTML = `<p class="guestbook-empty">Connect Firebase (see firebase-config.js) to enable the live guestbook.</p>`;
  } else {
    // Live-updating list, most recent first
    window.db
      .collection("guestbook")
      .orderBy("createdAt", "desc")
      .limit(20)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            listEl.innerHTML = `<p class="guestbook-empty">No entries yet — be the first to sign!</p>`;
            return;
          }
          listEl.innerHTML = snapshot.docs
            .map((doc) => {
              const d = doc.data();
              return `
                <div class="guestbook-entry">
                  <i class="fa-solid fa-user-pen"></i>
                  <div>
                    <p class="guestbook-name">${escapeHtml(d.name || "Anonymous")}</p>
                    <p class="guestbook-msg">${escapeHtml(d.message || "")}</p>
                  </div>
                </div>`;
            })
            .join("");
        },
        (err) => {
          console.error("Guestbook listener error:", err);
          listEl.innerHTML = `<p class="guestbook-empty">Couldn't load guestbook entries right now.</p>`;
        }
      );
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!window.db) {
      status.textContent = "Firebase isn't connected yet — see firebase-config.js.";
      status.className = "form-status warn";
      return;
    }

    const guestName = document.getElementById("guestName").value.trim();
    const guestMessage = document.getElementById("guestMessage").value.trim();
    if (!guestName || !guestMessage) return;

    submitBtn.disabled = true;
    try {
      await window.db.collection("guestbook").add({
        name: guestName,
        message: guestMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      status.textContent = "Thanks for signing the guestbook!";
      status.className = "form-status success";
      form.reset();
    } catch (err) {
      console.error("Guestbook submit error:", err);
      status.textContent = "Couldn't post your entry. Please try again.";
      status.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =============================================================
   VISITOR COUNTER — Firestore document with an atomic increment,
   counted once per browser session via sessionStorage
   ============================================================= */
function initVisitorCounter() {
  const countEl = document.getElementById("visitorCount");
  if (!countEl) return;

  if (!window.db) {
    countEl.textContent = "connect Firebase";
    return;
  }

  const statsRef = window.db.collection("stats").doc("visitors");
  const alreadyCounted = sessionStorage.getItem("jcmg-visit-counted");

  const run = alreadyCounted
    ? statsRef.get()
    : statsRef
        .set({ count: firebase.firestore.FieldValue.increment(1) }, { merge: true })
        .then(() => {
          sessionStorage.setItem("jcmg-visit-counted", "1");
          return statsRef.get();
        });

  run
    .then((doc) => {
      const count = doc.exists ? doc.data().count : 1;
      countEl.textContent = count ?? "1";
    })
    .catch((err) => {
      console.warn("Visitor counter error:", err);
      countEl.textContent = "—";
    });
}


/* =============================================================
   CHATBOT MODULE
   Works fully offline using keyword matching against a small
   local knowledge base describing John's profile.
   ============================================================= */
function initChatbot() {
  // initChatbot starting
  try {
    const chatToggle = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");
    const chatClose = document.getElementById("chatClose");
    const chatMessages = document.getElementById("chatMessages");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const quickReplies = document.getElementById("chatQuickReplies");

    if (!chatToggle || !chatWindow || !chatClose || !chatMessages || !chatForm || !chatInput || !quickReplies) {
      console.warn('Chatbot init aborted: missing chat DOM elements', {
        chatToggleExists: !!chatToggle,
        chatWindowExists: !!chatWindow,
        chatCloseExists: !!chatClose,
        chatMessagesExists: !!chatMessages,
        chatFormExists: !!chatForm,
        chatInputExists: !!chatInput,
        quickRepliesExists: !!quickReplies,
      });
      return;
    }

    let hasOpenedBefore = false;

  /* ---------- Knowledge base ---------- */
  const profile = {
    name: "John Carlo M. Gayo",
    course: "Bachelor of Science in Computer Science",
    yearLevel: "3rd Year",
    intro:
      "an aspiring Software Developer passionate about web development, database systems, artificial intelligence, and technology innovation",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 78 },
      { name: "Microsoft Access", level: 75 },
      { name: "Database Management", level: 80 },
      { name: "Git & GitHub", level: 82 },
    ],
    projects: [
      {
        name: "SKionix Barangay Management System",
        desc: "a digital system that streamlines barangay records, resident profiling, and document requests",
        tech: "HTML, CSS, JavaScript, Database",
      },
      {
        name: "Rice Yield Prediction System",
        desc: "a predictive analytics tool that estimates rice crop yield from environmental and agricultural data",
        tech: "Python, Machine Learning, Data Analysis",
      },
      {
        name: "Student Academic Performance Prediction System",
        desc: "a system that analyzes academic records to predict student performance trends",
        tech: "Python, Database Management, Prediction Models",
      },
      {
        name: "Personal Portfolio Website",
        desc: "this responsive, dark-themed portfolio site with a built-in local AI chatbot",
        tech: "HTML, CSS, JavaScript",
      },
    ],
    education: {
      program: "Bachelor of Science in Computer Science",
      year: "3rd Year",
      coursework: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Computer Networks",
        "Web Application Development",
        "Artificial Intelligence Fundamentals",
        "Software Engineering",
        "Information Assurance & Security",
        "Computer Organization",
      ],
    },
    contact: {
      email: "johncarlogayo@gmail.com",
      phone: "+63 915 306 8211",
      facebook: "facebook.com/johncarlogayo",
      github: "github.com/johncarlogayo",
      linkedin: "linkedin.com/in/johncarlogayo",
    },
    goals:
      "growing into a full-stack software developer and eventually specializing in intelligent, data-driven applications powered by AI",
    interests:
      "exploring new tech tools, building side projects, playing strategy games, and following trends in software and AI",
  };

  /* ---------- Intent matching rules ---------- */
  const rules = [
    {
      intents: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      reply: () =>
        `Hi there! 👋 I'm a local assistant that knows everything about ${profile.name}'s profile. Ask me about his skills, projects, education, or how to contact him!`,
    },
    {
      intents: ["name", "who are you", "who is john"],
      reply: () =>
        `This portfolio belongs to ${profile.name}, a student taking up ${profile.course}.`,
    },
    {
      intents: ["course", "program", "study", "major", "degree"],
      reply: () =>
        `John is currently enrolled in ${profile.course}, in his ${profile.yearLevel}.`,
    },
    {
      intents: ["skill", "skills", "good at", "technologies", "tech stack", "abilities"],
      reply: () => {
        const list = profile.skills
          .map((s) => `${s.name} (${s.level}%)`)
          .join(", ");
        return `John's core skills include: ${list}. He's especially comfortable with front-end basics like HTML/CSS/JavaScript, plus Python and database management.`;
      },
    },
    {
      intents: ["project", "projects", "built", "portfolio", "work"],
      reply: () => {
        const list = profile.projects.map((p) => `• ${p.name} — ${p.desc}`).join("\n");
        return `Here are some of John's projects:\n${list}\n\nWant details on a specific one? Just type its name!`;
      },
    },
    {
      intents: ["skionix", "barangay"],
      reply: () => {
        const p = profile.projects[0];
        return `${p.name}: ${p.desc}. Built with ${p.tech}.`;
      },
    },
    {
      intents: ["rice", "yield", "crop"],
      reply: () => {
        const p = profile.projects[1];
        return `${p.name}: ${p.desc}. Built with ${p.tech}.`;
      },
    },
    {
      intents: ["academic performance", "student performance", "grade prediction"],
      reply: () => {
        const p = profile.projects[2];
        return `${p.name}: ${p.desc}. Built with ${p.tech}.`;
      },
    },
    {
      intents: ["education", "school", "university", "college", "year level", "coursework", "subjects"],
      reply: () =>
        `John is taking up ${profile.education.program}, currently in his ${profile.education.year}. Relevant coursework includes: ${profile.education.coursework.join(
          ", "
        )}.`,
    },
    {
      intents: ["goal", "goals", "career", "future", "plan", "ambition"],
      reply: () => `John's career goal is ${profile.goals}.`,
    },
    {
      intents: ["interest", "interests", "hobby", "hobbies", "fun", "free time"],
      reply: () => `Outside of coding, John enjoys ${profile.interests}.`,
    },
    {
      intents: ["about", "introduction", "introduce", "tell me about"],
      reply: () =>
        `${profile.name} is ${profile.intro}. He's currently a ${profile.education.year} BS Computer Science student focused on growing his skills in development and AI.`,
    },
    {
      intents: ["contact", "email", "reach", "phone", "number", "call"],
      reply: () =>
        `You can reach John at ${profile.contact.email} or ${profile.contact.phone}. You can also find him on Facebook (${profile.contact.facebook}), GitHub (${profile.contact.github}), or LinkedIn (${profile.contact.linkedin}).`,
    },
    {
      intents: ["github"],
      reply: () => `John's GitHub profile: ${profile.contact.github}`,
    },
    {
      intents: ["linkedin"],
      reply: () => `John's LinkedIn profile: ${profile.contact.linkedin}`,
    },
    {
      intents: ["facebook"],
      reply: () => `John's Facebook page: ${profile.contact.facebook}`,
    },
    {
      intents: ["thank", "thanks", "appreciate"],
      reply: () => `You're welcome! 😊 Let me know if you'd like to know more about John.`,
    },
    {
      intents: ["bye", "goodbye", "see you"],
      reply: () => `Thanks for stopping by John's portfolio! 👋 Feel free to reach out using the contact section.`,
    },
  ];

  const fallbackReplies = [
    "I'm not totally sure about that one — but feel free to ask about John's skills, projects, education, or contact details!",
    "Hmm, I don't have an answer for that yet. Try asking about his projects or skills!",
    "I can mainly answer questions about John's profile — try asking about his education, skills, or projects.",
  ];

  function findReply(userText) {
    const text = userText.toLowerCase();
    for (const rule of rules) {
      if (rule.intents.some((keyword) => text.includes(keyword))) {
        return rule.reply();
      }
    }
    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  }

  /* ---------- UI helpers ---------- */
  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function showTypingIndicator() {
    const typing = document.createElement("div");
    typing.classList.add("msg", "bot", "typing");
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
  }

  function botRespond(userText) {
    const typingEl = showTypingIndicator();
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      typingEl.remove();
      const reply = findReply(userText);
      appendMessage(reply, "bot");
    }, delay);
  }

  function sendUserMessage(text) {
    if (!text.trim()) return;
    appendMessage(text, "user");
    chatInput.value = "";
    botRespond(text);
  }

  /* ---------- Events ---------- */
  chatToggle.addEventListener("click", () => {
    const isOpen = chatWindow.classList.toggle("open");
    if (isOpen && !hasOpenedBefore) {
      hasOpenedBefore = true;
      appendMessage(
        `Hi! I'm John Carlo's local AI assistant 🤖 — ask me anything about his skills, projects, education, or how to contact him.`,
        "bot"
      );
    }
  });

  chatClose.addEventListener("click", () => chatWindow.classList.remove("open"));

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendUserMessage(chatInput.value);
  });

  quickReplies.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    sendUserMessage(btn.getAttribute("data-q"));
  });
  } catch (err) {
    console.error('initChatbot error:', err);
  }
}
