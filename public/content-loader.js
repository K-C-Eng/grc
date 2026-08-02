/**
 * Content Fetcher for Graceland Public Site
 * Fetches editable content from the API
 */

const API_BASE_URL = 'http://localhost:8000/api';

async function fetchPageContent(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/page/${slug}`);
    if (!response.ok) throw new Error(`Failed to fetch ${slug}`);
    return await response.json();
  } catch (error) {
    console.warn(`[Content Fetch] Could not fetch ${slug}:`, error.message);
    return null;
  }
}

async function loadHomepageContent() {
  const data = await fetchPageContent('home');
  if (!data) return;

  const { page } = data;

  if (page.hero?.heading) {
    const h1 = document.querySelector('.hero-inner h1');
    if (h1) h1.textContent = page.hero.heading;
  }

  if (page.hero?.subheading) {
    const p = document.querySelector('.hero-inner > p');
    if (p) p.textContent = page.hero.subheading;
  }
}

async function loadAboutContent() {
  const data = await fetchPageContent('about');
  if (!data) return;

  const { page } = data;

  if (page.title) {
    const h2 = document.querySelector('.about-text h2');
    if (h2) h2.textContent = page.title;
  }

  if (page.blocks && page.blocks.length > 0) {
    const block = page.blocks[0];
    if (block.text) {
      const p = document.querySelector('.about-text > p');
      if (p) p.textContent = block.text;
    }
  }
}

// Load content on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hero-inner')) loadHomepageContent();
  if (document.querySelector('.about-text')) loadAboutContent();
});
