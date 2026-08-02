/* ============================================================
   Graceland PVO — Shared content + SVG icons + footer
   In production this content is served by the Flask/MySQL CMS.
   ============================================================ */

const ICONS = {
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  scale: '<path d="M12 3v18"/><path d="M6 21h12"/><path d="m3 7 3-4 3 4"/><path d="m15 7 3-4 3 4"/><path d="M6 7c0 2-1.5 4-3 4"/><path d="M6 7c0 2 1.5 4 3 4"/><path d="M18 7c0 2-1.5 4-3 4"/><path d="M18 7c0 2 1.5 4 3 4"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  stethoscope: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
  seedling: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>',
  facebook: '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z"/>',
  tiktok: '<path d="M14 3c.9 2.2 2.5 3.8 4.7 4.4v3.2c-1.6 0-3.1-.5-4.4-1.5v7.3c0 3.5-2.9 6.3-6.3 6.3S2.4 20.4 2.4 16.9 5.3 10.7 8.8 10.7c.5 0 .9.1 1.4.2v3.3c-.4-.1-.9-.2-1.4-.2-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4 3.4-1.5 3.4-3.4V3h2.8z"/>',
  whatsapp: '<path d="M21 11.5A8.5 8.5 0 0 1 12.5 20c-1.4 0-2.8-.3-4-.9L3 20l1.2-4.9A8.5 8.5 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/><path d="M15.6 13.7c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0-.2-.1-.8-.3-1.6-.9-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1.1-.2 0-.3-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.4c-.1 0-.3.1-.4.2-.1.2-.4.4-.4.9s.5 1.1.6 1.2c.1.1 1.1 1.7 2.7 2.5.4.2.7.3 1 .4.4.1.8.1 1-.1.3-.1.9-.8 1-1.1.1-.3.1-.6 0-.7z"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  chevronL: '<polyline points="15 18 9 12 15 6"/>',
  chevronR: '<polyline points="9 18 15 12 9 6"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
};

function svg(name, w = 24) {
  return `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

const DATA = {
  values: [
    { icon: "heart", title: "Compassion", text: "We serve with genuine care for the dignity of every person." },
    { icon: "shield", title: "Integrity", text: "We act honestly and ethically in everything we do." },
    { icon: "check", title: "Accountability", text: "We take responsibility for our actions and outcomes." },
    { icon: "eye", title: "Transparency", text: "We are open about how resources are used and managed." },
    { icon: "users", title: "Respect", text: "We honour the culture, voice and choices of communities." },
    { icon: "star", title: "Excellence", text: "We pursue the highest standards in all our programmes." },
    { icon: "handshake", title: "Service", text: "We put the needs of vulnerable people first." },
    { icon: "sparkles", title: "Empowerment", text: "We equip communities to become self-reliant." },
  ],

  programmes: [
    { icon: "heart", title: "Care for Widows & Orphans", text: "Restoring hope through food hamper distribution, blankets and clothing support for vulnerable households.", tags: ["Food hamper distribution", "Blankets & clothing", "School fees", "Stationery"] },
    { icon: "stethoscope", title: "Healthcare Support", text: "Bringing quality healthcare closer to underserved communities, including clinic drug handover and wheelchair support for persons with disabilities.", tags: ["Medical outreach", "Clinic drug handover", "Wheelchairs", "Healthcare access"] },
    { icon: "book", title: "Education Support", text: "Keeping children in school and helping them thrive academically.", tags: ["School fees", "Uniforms", "Educational materials"] },
    { icon: "pill", title: "Drug Substance Rehabilitation", text: "Supporting recovery and reintegration through counselling, rehabilitation and skills development.", tags: ["Substance rehabilitation", "Counselling", "Skills development"] },
    { icon: "seedling", title: "Community Development", text: "Building resilient, self-reliant communities through short survival skills training and local economic empowerment.", tags: ["Short survival skills", "Poverty alleviation", "Sustainable livelihoods", "Youth empowerment"] },
    { icon: "building", title: "Construction Projects", text: "Investing in lasting infrastructure that serves generations, including elderly house rehabilitation and other community facilities.", tags: ["Elderly house rehabilitation", "Schools", "Hospitals", "Children's homes", "Rehab centres"] },
  ],

  impact: [
    { icon: "users", num: 1200, suffix: "+", label: "Families Supported" },
    { icon: "heart", num: 3500, suffix: "+", label: "Children Assisted" },
    { icon: "handshake", num: 640, suffix: "+", label: "Volunteers" },
    { icon: "check", num: 85, suffix: "+", label: "Projects Completed" },
    { icon: "globe", num: 45, suffix: "+", label: "Communities Reached" },
  ],

  news: [
    { id: 1, cat: "Success Story", title: "300 children receive new uniforms ahead of the school term", excerpt: "Thanks to generous donors, we equipped hundreds of learners with uniforms, shoes and stationery across three districts.", img: "gallery-1.jpg", author: "Grace Moyo", date: "May 12, 2026" },
    { id: 2, cat: "Healthcare", title: "Mobile clinic reaches remote villages in Manicaland", excerpt: "Our medical outreach team delivered free screenings, medication and health education to over 800 residents.", img: "gallery-2.jpg", author: "Dr. T. Ncube", date: "Apr 28, 2026" },
    { id: 3, cat: "Fundraising", title: "Annual charity gala raises record support for orphans", excerpt: "Community partners and businesses rallied together to fund food hampers and school fees for the coming year.", img: "gallery-3.jpg", author: "Admin Team", date: "Apr 09, 2026" },
    { id: 4, cat: "Projects", title: "New community learning centre opens its doors", excerpt: "A milestone construction project now provides a safe space for education and youth skills programmes.", img: "gallery-4.jpg", author: "Grace Moyo", date: "Mar 22, 2026" },
    { id: 5, cat: "Community", title: "Youth skills workshop empowers 120 young people", excerpt: "Practical training in carpentry, tailoring and entrepreneurship is opening new doors for local youth.", img: "gallery-5.jpg", author: "Admin Team", date: "Mar 03, 2026" },
    { id: 6, cat: "Success Story", title: "Widows co-operative launches sustainable garden project", excerpt: "A group of widows is now growing produce for income and nutrition, with support from our development team.", img: "gallery-6.jpg", author: "Grace Moyo", date: "Feb 18, 2026" },
  ],

  gallery: [
    { src: "gallery-1.jpg", cat: "food hamper distribution", title: "Food hamper distribution" },
    { src: "gallery-2.jpg", cat: "clinic drugs handover", title: "Clinic drugs handover" },
    { src: "gallery-3.jpg", cat: "wheelchairs", title: "Wheelchairs" },
    { src: "gallery-4.jpg", cat: "blankets and clothing", title: "Blankets and clothing" },
    { src: "gallery-5.jpg", cat: "short survival skills", title: "Short survival skills" },
    { src: "gallery-6.jpg", cat: "elderly house rehabilitation", title: "Elderly house rehabilitation" },
    { src: "hero-community.jpg", cat: "school fees and stationery piggery", title: "School fees and stationery piggery" },
    { src: "about-team.jpg", cat: "community support", title: "Volunteers in action" },
  ],
};

/* ---------- Shared footer injected on every page ---------- */
function renderFooter() {
  const slot = document.getElementById("footer-slot");
  if (!slot) return;
  slot.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html">
            <img class="logo" src="logo.png" alt="Graceland PVO logo" width="42" height="42" />
            <span>Graceland<small>Private Voluntary Org.</small></span>
          </a>
          <p>A registered humanitarian organisation transforming lives through compassion, service and sustainable community development across Zimbabwe.</p>
          <div class="socials">
            <a class="facebook" href="https://www.facebook.com/share/18z38evtrU/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${svg("facebook", 18)}</a>
            <a class="tiktok" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">${svg("tiktok", 18)}</a>
            <a class="whatsapp" href="https://wa.me/263780827356?text=%F0%9F%91%8B%20*Welcome%20to%20Graceland!*%0A%0AThank%20you%20for%20contacting%20**Graceland%20%E2%80%93%20Registered%20Private%20Voluntary%20Organisation%20(PVO%2018%2F26)%2C%20Zimbabwe**.%0A%0AWe%20are%20committed%20to%20*restoring%20hope%2C%20empowering%20communities%2C%20and%20transforming%20lives*%20through%20community%20welfare%2C%20child%20protection%2C%20disability%20support%2C%20healthcare%2C%20rehabilitation%2C%20and%20empowerment%20programmes.%0A%0AYour%20message%20is%20important%20to%20us.%20A%20member%20of%20our%20team%20will%20respond%20as%20soon%20as%20possible%20during%20our%20working%20hours.%0A%0APlease%20feel%20free%20to%20tell%20us%3A%0A%E2%80%A2%20Your%20name%0A%E2%80%A2%20How%20we%20can%20assist%20you%0A%E2%80%A2%20The%20programme%20or%20service%20you%20are%20inquiring%20about%0A%0AThank%20you%20for%20reaching%20out%20to%20Graceland.%20%F0%9F%A4%9D%F0%9F%92%99" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${svg("whatsapp", 18)}</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html#about">About Us</a></li>
            <li><a href="index.html#programmes">Programmes</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="volunteer.html">Volunteer</a></li>
          </ul>
        </div>
        <div>
          <h4>Get Involved</h4>
          <ul>
            <li><a href="donate.html">Donate</a></li>
            <li><a href="volunteer.html">Become a Volunteer</a></li>
            <li><a href="contact.html">Partner With Us</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Get updates on our projects, impact stories and campaigns.</p>
          <form class="newsletter" data-newsletter aria-label="Subscribe to newsletter">
            <input type="email" placeholder="Your email address" aria-label="Email address" required />
            <button class="btn" type="submit" aria-label="Subscribe">${svg("check", 18)}</button>
          </form>
          <p style="margin-top:16px;font-size:.85rem">Harare, Zimbabwe · <a href="mailto:gracelandpvo@outlook.com">gracelandpvo@outlook.com</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year">2026</span> Graceland Private Voluntary Organization. All rights reserved.</span>
        <span>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </span>
      </div>
    </div>`;
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
}
renderFooter();
