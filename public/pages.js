/* ============================================================
   Graceland PVO — Interior page interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Gallery render + filter + lightbox ---------- */
  const gg = document.getElementById("galleryGrid");
  if (gg && typeof DATA !== "undefined") {
    const cats = ["all", ...new Set(DATA.gallery.map((g) => g.cat))];
    const filters = document.getElementById("galleryFilters");
    if (filters) {
      filters.innerHTML = cats
        .map(
          (c, i) =>
            `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${c}">${c}</button>`
        )
        .join("");
    }

    gg.innerHTML = DATA.gallery
      .map(
        (g, i) => `
      <figure class="masonry-item" data-cat="${g.cat}" data-index="${i}" data-reveal="scale" data-delay="${(i % 4) + 1}">
        <img src="${g.src}" alt="${g.title}" loading="lazy" />
        <span class="zoom">${svg("search", 20)}</span>
        <figcaption class="cap">${g.title}</figcaption>
      </figure>`
      )
      .join("");

    // Filtering
    if (filters) {
      filters.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filters.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        gg.querySelectorAll(".masonry-item").forEach((item) => {
          item.classList.toggle("hide", f !== "all" && item.dataset.cat !== f);
        });
      });
    }

    // Lightbox
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbCap = document.getElementById("lbCap");
    let current = 0;
    const visible = () =>
      [...gg.querySelectorAll(".masonry-item")].filter((i) => !i.classList.contains("hide"));

    function show(index) {
      const items = visible();
      if (!items.length) return;
      current = (index + items.length) % items.length;
      const item = items[current];
      const data = DATA.gallery[+item.dataset.index];
      lbImg.src = data.src;
      lbImg.alt = data.title;
      lbCap.textContent = data.title;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    gg.addEventListener("click", (e) => {
      const item = e.target.closest(".masonry-item");
      if (!item) return;
      const items = visible();
      show(items.indexOf(item));
    });
    if (lb) {
      document.getElementById("lbClose").addEventListener("click", close);
      document.getElementById("lbPrev").addEventListener("click", () => show(current - 1));
      document.getElementById("lbNext").addEventListener("click", () => show(current + 1));
      lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
      document.addEventListener("keydown", (e) => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
      });
    }
  }

  /* ---------- News render ---------- */
  const ng = document.getElementById("newsGrid");
  if (ng && typeof DATA !== "undefined") {
    ng.innerHTML = DATA.news
      .map(
        (n, i) => `
      <article class="news-card" data-reveal data-delay="${(i % 3) + 1}">
        <div class="news-thumb">
          <img src="${n.img}" alt="${n.title}" loading="lazy" />
          <span class="news-cat">${n.cat}</span>
        </div>
        <div class="news-body">
          <div class="news-meta"><span>${n.date}</span><span class="dot"></span><span>By ${n.author}</span></div>
          <h3>${n.title}</h3>
          <p>${n.excerpt}</p>
          <a class="read-more" href="#" onclick="return false">Read more ${svg("arrow", 16)}</a>
        </div>
      </article>`
      )
      .join("");
  }

  /* ---------- Donation frequency toggle ---------- */
  document.querySelectorAll("[data-freq]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-freq]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  /* ---------- Donation amount chips ---------- */
  const amounts = document.getElementById("amountGrid");
  if (amounts) {
    const custom = document.getElementById("customAmount");
    amounts.addEventListener("click", (e) => {
      const chip = e.target.closest(".amount-chip");
      if (!chip) return;
      amounts.querySelectorAll(".amount-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      if (custom) custom.value = chip.dataset.amount;
    });
    if (custom) {
      custom.addEventListener("input", () =>
        amounts.querySelectorAll(".amount-chip").forEach((c) => c.classList.remove("active"))
      );
    }
  }

  /* ---------- Icon injection for [data-icon] elements ---------- */
  if (typeof svg !== "undefined") {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      el.innerHTML = svg(el.dataset.icon, 24);
    });
  }

  function checkField(field) {
    const rule = field.dataset.validate;
    if (!rule) return true;
    const val = field.value.trim();
    if (rule === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    return val !== "";
  }

  /* ---------- Form validation (fields with data-validate) ---------- */
  document.querySelectorAll("form").forEach((form) => {
    const fields = form.querySelectorAll("[data-validate]");
    if (!fields.length) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      fields.forEach((field) => {
        const wrap = field.closest(".field");
        const valid = checkField(field);
        if (wrap) wrap.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        const firstInvalid = form.querySelector(".field.invalid input, .field.invalid textarea, .field.invalid select");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // If this is the contact form, open the user's mail client with a prefilled message
      if (form.id === "contactForm") {
        const name = (form.querySelector('#c-name') || {}).value || '';
        const email = (form.querySelector('#c-email') || {}).value || '';
        const subject = (form.querySelector('#c-subject') || {}).value || 'Enquiry from website';
        const message = (form.querySelector('#c-message') || {}).value || '';
        const to = 'gracelandpvo@outlook.com';
        const bodyLines = [];
        if (name) bodyLines.push('Name: ' + name);
        if (email) bodyLines.push('Email: ' + email);
        bodyLines.push('');
        bodyLines.push(message);
        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
        // open mail client in new tab/window
        window.location.href = mailto;
      }

      const success = form.querySelector(".form-success");
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
      form.querySelectorAll(".amount-chip.active").forEach((c) => c.classList.remove("active"));
    });

    fields.forEach((field) => {
      field.addEventListener("input", () => {
        const wrap = field.closest(".field");
        if (wrap && wrap.classList.contains("invalid")) {
          wrap.classList.toggle("invalid", !checkField(field));
        }
      });
    });
  });
})();
