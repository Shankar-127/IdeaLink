/* ============================================================
   IDEALINK — script.js
   Vanilla JavaScript — No frameworks
   ============================================================ */

/* ---------- GOOGLE FORM URLs ---------- */
const IDEA_FORM_URL = "https://forms.gle/AUeNmhxkDg8LoVyr6";
const INVESTOR_FORM_URL = "https://forms.gle/cxzvri66p5UP9FK97";

/* ---------- Form opener functions ---------- */
function openIdeaForm() {
  if (!IDEA_FORM_URL || IDEA_FORM_URL === "YOUR_IDEA_GOOGLE_FORM_LINK") {
    alert("⚠️ Idea submission form link not yet configured.\n\nReplace IDEA_FORM_URL in script.js with your Google Form link.");
    return;
  }
  window.open(IDEA_FORM_URL, "_blank", "noopener,noreferrer");
}

function openInvestorForm() {
  if (!INVESTOR_FORM_URL || INVESTOR_FORM_URL === "YOUR_INVESTOR_GOOGLE_FORM_LINK") {
    alert("⚠️ Investor contact form link not yet configured.\n\nReplace INVESTOR_FORM_URL in script.js with your Google Form link.");
    return;
  }
  window.open(INVESTOR_FORM_URL, "_blank", "noopener,noreferrer");
}

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initFAQ();
  initScrollReveal();
  initActiveNavLink();
  initBackToTop();
  bindFormButtons();
});

/* ============================================================
   1. NAVBAR — sticky scroll effect
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run on load
}

/* ============================================================
   2. HAMBURGER MENU
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on nav link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

/* ============================================================
   3. SMOOTH SCROLLING
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

/* ============================================================
   4. FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all others
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const otherAnswer = other.querySelector(".faq-answer");
          if (otherAnswer) otherAnswer.style.maxHeight = "0";
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = "0";
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });

    // Keyboard accessibility
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
}

/* ============================================================
   5. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve once revealed for performance
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -48px 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ============================================================
   6. ACTIVE NAVIGATION LINK (on scroll)
   ============================================================ */
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ============================================================
   7. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   8. BIND FORM BUTTONS
   ============================================================ */
function bindFormButtons() {
  // Bind all idea form buttons
  document.querySelectorAll("[data-action='idea-form']").forEach((btn) => {
    btn.addEventListener("click", openIdeaForm);
  });

  // Bind all investor form buttons
  document.querySelectorAll("[data-action='investor-form']").forEach((btn) => {
    btn.addEventListener("click", openInvestorForm);
  });
}
