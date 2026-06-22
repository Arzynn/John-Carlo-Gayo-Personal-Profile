/* =============================================================
   PERSONAL PROFILE WEBSITE — script.js
   John Carlo M. Gayo
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

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
  ----------------------------------------------------------- */
  const typedTextEl = document.getElementById("typedText");
  // Remove the "loading profile..." typing animation — leave no typed text
  if (typedTextEl) typedTextEl.textContent = "";
  // Hide the blinking cursor used by the typing effect
  const cursorEl = document.querySelector(".cursor");
  if (cursorEl) cursorEl.style.display = "none";

  /* -----------------------------------------------------------
     5. SCROLL REVEAL + ANIMATED SKILL BARS (IntersectionObserver)
  ----------------------------------------------------------- */
  // Tag elements for generic reveal animation
  document
    .querySelectorAll(
      ".about-card, .skill-card, .project-card, .education-card, .contact-card, .section-title, .eyebrow"
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
});


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
