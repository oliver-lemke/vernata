/* ============================================================
   Vernata project page — main.js
   No dependencies. Handles: active-nav, reveals,
   inline-video play/pause, copy-bibtex.
   ============================================================ */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Active-nav highlight via IntersectionObserver ---------- */
  (function activeNav() {
    const sections = document.querySelectorAll("main section[id]");
    const linkFor = (id) =>
      document.querySelector('.nav-list a[href="#' + id + '"]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            document
              .querySelectorAll(".nav-list a.is-active")
              .forEach((a) => a.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  })();

  /* ---------- Reveal-on-scroll (motion-safe) ---------- */
  (function reveals() {
    if (prefersReducedMotion) return;
    const targets = document.querySelectorAll(".section, .hero-media");
    targets.forEach((t) => t.classList.add("reveal"));
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    targets.forEach((t) => observer.observe(t));
  })();

  /* ---------- Inline videos: play/pause on visibility ---------- */
  (function inlineVideos() {
    const vids = document.querySelectorAll("video[playsinline], video.hero-media-video");
    if (!vids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    vids.forEach((v) => observer.observe(v));
  })();

  /* ---------- Copy BibTeX ---------- */
  (function copyBibtex() {
    document.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const target = document.querySelector(btn.dataset.copyTarget);
        if (!target) return;
        const text = target.innerText;
        try {
          await navigator.clipboard.writeText(text);
        } catch (e) {
          // Fallback for non-secure contexts
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (_) {}
          document.body.removeChild(ta);
        }
        const original = btn.textContent;
        btn.textContent = "Copied ✓";
        btn.classList.add("is-copied");
        window.setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1500);
      });
    });
  })();
})();
