/* ============================================================
   Graceland PVO — Shared interactions
   ============================================================ */
(function () {
  "use strict";

  const isContactPage = document.body.classList.contains("contact-page");

  /* ---------- Sticky navbar ---------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Active nav + smooth scroll ---------- */
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  const sectionIds = Array.from(document.querySelectorAll("section[id]"))
    .map((section) => section.id)
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const targetId = href.includes("#") ? href.split("#").pop() : "";
      const isMatch = targetId && targetId === id;
      const isHome = id === "home" && href === "index.html";
      link.classList.toggle("active", isMatch || isHome);
    });
  };

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.includes("#")) return;

    link.addEventListener("click", (event) => {
      const targetId = href.split("#").pop();
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target || targetId === "") return;

      event.preventDefault();
      setActiveLink(targetId);
      const offset = nav ? nav.offsetHeight + 18 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      if (window.history.pushState) {
        const pageUrl = window.location.pathname + "#" + targetId;
        window.history.pushState(null, "", pageUrl);
      }
    });
  });

  if (!isContactPage) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target && visible.target.id) {
          setActiveLink(visible.target.id);
        }
      },
      {
        threshold: [0.35, 0.6, 0.8],
        rootMargin: "-10% 0px -45% 0px"
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!isContactPage && "IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else if (!isContactPage) {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Parallax background motion ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax], .hero-bg img, .hero-blob, .page-hero");
  const handleParallax = () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = Number(el.dataset.speed || 0.12);
      const move = scrollY * speed;
      el.style.transform = `translate3d(0, ${move}px, 0)`;
    });
  };

  if (!isContactPage && parallaxEls.length) {
    window.addEventListener("scroll", handleParallax, { passive: true });
    handleParallax();
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseFloat(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") || "";
          const dur = 1800;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.floor(eased * target);
            el.textContent = val.toLocaleString() + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString() + suffix;
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Ripple buttons ---------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const r = document.createElement("span");
      r.className = "ripple";
      r.style.width = r.style.height = size + "px";
      r.style.left = e.clientX - rect.left - size / 2 + "px";
      r.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  /* ---------- Active nav link by path ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "index.html" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------- Footer year ---------- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Newsletter (demo handler) ---------- */
  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (input && input.value.trim()) {
        input.value = "";
        input.placeholder = "Thank you for subscribing!";
      }
    });
  });

  /* ---------- Phone action modal (call or WhatsApp) ---------- */
  (function setupPhoneActions() {
    const modal = document.createElement('div');
    modal.id = 'phoneActionModal';
    modal.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:1200;background:rgba(0,0,0,0.45)';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:18px 20px;max-width:420px;width:92%;box-shadow:var(--shadow-lg);text-align:center">
        <div style="font-weight:600;margin-bottom:8px">Contact Options</div>
        <div id="pamNumber" style="color:var(--ink-700);margin-bottom:14px"></div>
        <div style="display:flex;gap:10px;justify-content:center">
          <button id="pamCall" class="btn btn-ghost" style="flex:1">Call</button>
          <button id="pamWhats" class="btn btn-amber" style="flex:1">WhatsApp</button>
        </div>
        <button id="pamClose" aria-label="Close" style="margin-top:12px;background:transparent;border:0;color:var(--ink-500)">Close</button>
      </div>`;
    document.body.appendChild(modal);

    const pamNumber = modal.querySelector('#pamNumber');
    const pamCall = modal.querySelector('#pamCall');
    const pamWhats = modal.querySelector('#pamWhats');
    const pamClose = modal.querySelector('#pamClose');

    function openModal(number) {
      pamNumber.textContent = number;
      modal.style.display = 'flex';
      modal.dataset.phone = number;
    }
    function closeModal() {
      modal.style.display = 'none';
      modal.dataset.phone = '';
    }

    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('.phone-link');
      if (!a) return;
      e.preventDefault();
      const raw = a.dataset.phone || a.textContent || '';
      const normalized = (raw + '').replace(/[^+0-9]/g, '');
      openModal(normalized);
    });

    pamCall.addEventListener('click', () => {
      const num = modal.dataset.phone || '';
      if (!num) return closeModal();
      window.location.href = `tel:${num}`;
      closeModal();
    });

    pamWhats.addEventListener('click', () => {
      const num = modal.dataset.phone || '';
      if (!num) return closeModal();
      const waNum = num.replace(/[^0-9]/g, '').replace(/^0+/, '');
      const url = `https://wa.me/${waNum}`;
      window.open(url, '_blank');
      closeModal();
    });

    pamClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  })();
})();
