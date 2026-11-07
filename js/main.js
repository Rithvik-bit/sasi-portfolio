/**
 * Rithvik Portfolio — Main Interactive Controller
 * Appala Venkat Sasi Rithvik — Software Developer & Creative Technologist
 */

import { caseStudies, creativeWork, skillsData } from './case-studies-data.js';
import { initTechText } from './components/TechText.js';
import { initFluxLines } from './components/FluxLines.js';
import { initLanyard } from './components/Lanyard.js';
import { initStarBorder } from './components/StarBorder.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollReveals();
  initSkillsFilter();
  initCaseStudyModal();
  initCreativeModal();
  initLiveClock();
  initContactForm();
  initInteractiveComponents();
  initRedzHub();
});

/* ==========================================================================
   THEME CONTROLLER (Warm Ivory Light / OLED Dark)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const nextTheme = active === 'dark' ? 'light' : 'dark';

    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcon(nextTheme);
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: nextTheme } }));
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-toggle-icon');
  if (!icon) return;
  if (theme === 'dark') {
    // Sun icon for dark mode (click to go light)
    icon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    icon.setAttribute('aria-label', 'Switch to light theme');
  } else {
    // Moon icon for light mode (click to go dark)
    icon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    icon.setAttribute('aria-label', 'Switch to dark theme');
  }
}

/* ==========================================================================
   NAVIGATION & ACTIVE SECTION TRACKER
   ========================================================================== */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && menuOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = menuOverlay.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on mobile link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOverlay.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section spy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   SCROLL ENTRANCE REVEALS
   ========================================================================== */
function initScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ==========================================================================
   SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
  const container = document.getElementById('skills-grid-container');
  const filterButtons = document.querySelectorAll('.skills-filter-btn');
  if (!container) return;

  renderSkills('all');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderSkills(filter);
    });
  });

  function renderSkills(filter) {
    container.innerHTML = '';
    const categories = skillsData.categories.filter(cat => {
      if (filter === 'all') return true;
      return cat.filterGroup === filter;
    });

    categories.forEach(cat => {
      const catCard = document.createElement('div');
      catCard.className = 'skills-cat-card double-bezel reveal visible';
      
      const chipsHtml = cat.skills.map(s => {
        let badgeClass = 'badge-proven';
        let badgeLabel = 'Project Proven';
        if (s.type === 'academic') {
          badgeClass = 'badge-academic';
          badgeLabel = 'Academic Fundamental';
        } else if (s.type === 'explored') {
          badgeClass = 'badge-explored';
          badgeLabel = 'Active Exploration';
        }

        return `
          <div class="skill-item">
            <div class="skill-head">
              <span class="skill-name">${escapeHtml(s.name)}</span>
              <span class="skill-badge ${badgeClass}">${badgeLabel}</span>
            </div>
            <p class="skill-desc">${escapeHtml(s.desc)}</p>
          </div>
        `;
      }).join('');

      catCard.innerHTML = `
        <div class="double-bezel-inner">
          <div class="cat-header">
            <span class="cat-tag">${getFilterLabel(cat.filterGroup)}</span>
            <h3 class="cat-title">${escapeHtml(cat.name)}</h3>
          </div>
          <div class="skills-list">
            ${chipsHtml}
          </div>
        </div>
      `;
      container.appendChild(catCard);
    });
  }

  function getFilterLabel(group) {
    switch (group) {
      case 'engineering': return 'Engineering & AI';
      case 'fullstack': return 'Full-Stack Architecture';
      case 'creative': return 'Creative & Production';
      default: return 'Core Capability';
    }
  }
}

/* ==========================================================================
   CASE STUDY MODAL & ROUTER
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('case-study-close');
  const modalBody = document.getElementById('case-study-body');
  if (!modal || !modalBody) return;

  // Open triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-study]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-case-study');
      openCaseStudy(id);
    }
  });

  // Close triggers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCaseStudy);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCaseStudy();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCaseStudy();
    }
  });

  // Check URL hash on load (e.g. #satquery or #case-study-satquery)
  handleHashNavigation();
  window.addEventListener('hashchange', handleHashNavigation);

  function handleHashNavigation() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    
    // Support either #case-study-satquery or direct #satquery
    const cleanId = hash.startsWith('case-study-') ? hash.replace('case-study-', '') : hash;
    if (caseStudies[cleanId]) {
      openCaseStudy(cleanId, false);
    }
  }

  function openCaseStudy(id, updateHash = true) {
    const data = caseStudies[id];
    if (!data) return;

    if (updateHash) {
      history.pushState(null, '', `#case-study-${id}`);
    }

    modalBody.innerHTML = renderCaseStudyHtml(data);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Hook prev/next buttons
    const prevBtn = modalBody.querySelector('[data-prev-case]');
    const nextBtn = modalBody.querySelector('[data-next-case]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => openCaseStudy(prevBtn.getAttribute('data-prev-case')));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => openCaseStudy(nextBtn.getAttribute('data-next-case')));
    }

    // Scroll to top of modal
    modal.scrollTop = 0;
  }

  function closeCaseStudy() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Clean URL hash if it was a case study
    if (window.location.hash.includes('case-study-') || caseStudies[window.location.hash.replace('#', '')]) {
      history.pushState(null, '', window.location.pathname);
    }
  }
}

function renderCaseStudyHtml(project) {
  const projectKeys = Object.keys(caseStudies);
  const currentIndex = projectKeys.indexOf(project.id);
  const prevKey = projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length];
  const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];
  const prevProject = caseStudies[prevKey];
  const nextProject = caseStudies[nextKey];

  // Technical decisions cards
  const decisionsHtml = project.technicalDecisions.map(td => `
    <div class="decision-card">
      <div class="decision-header">
        <span class="decision-bullet"></span>
        <h4 class="decision-title">${escapeHtml(td.title)}</h4>
      </div>
      <p class="decision-detail">${escapeHtml(td.detail)}</p>
    </div>
  `).join('');

  // Architecture nodes
  const archNodesHtml = project.architecture.nodes.map((node, i) => `
    <div class="arch-node-item">
      <div class="node-num">0${i + 1}</div>
      <div class="node-info">
        <h5 class="node-name">${escapeHtml(node.name)}</h5>
        <p class="node-desc">${escapeHtml(node.desc)}</p>
      </div>
    </div>
  `).join('');

  // Tech stack chips
  const techChips = project.technologies.map(t => `<span class="tech-chip">${escapeHtml(t)}</span>`).join('');

  // Visual header (real screenshot or interactive telemetry card)
  let visualBanner = '';
  if (project.previewImage) {
    visualBanner = `
      <div class="case-study-hero-image double-bezel">
        <div class="double-bezel-inner">
          <img src="${project.previewImage}" alt="${escapeHtml(project.title)} Interface Preview" loading="lazy"/>
        </div>
      </div>
    `;
  } else {
    visualBanner = renderInteractiveVisual(project);
  }

  // GitHub action button
  const githubBtn = project.githubUrl ? `
    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-pill">
      <span>View Source on GitHub</span>
      <span class="pill-icon">↗</span>
    </a>
  ` : '';

  // Status badge styling
  let statusBadgeClass = 'status-active';
  if (project.statusType === 'prototype') statusBadgeClass = 'status-proto';
  if (project.statusType === 'experiment') statusBadgeClass = 'status-exp';
  if (project.statusType === 'completed') statusBadgeClass = 'status-comp';

  return `
    <article class="case-study-content">
      <!-- Top Eyebrow & Status Bar -->
      <div class="case-meta-header">
        <div class="case-breadcrumbs">
          <span class="crumb-category">${escapeHtml(project.category)}</span>
          <span class="crumb-sep">/</span>
          <span class="crumb-year">${escapeHtml(project.year)}</span>
        </div>
        <span class="case-status-badge ${statusBadgeClass}">${escapeHtml(project.status)}</span>
      </div>

      <!-- Main Title & Subtitle -->
      <header class="case-study-header">
        <h1 class="case-title">${escapeHtml(project.title)}</h1>
        <p class="case-subtitle">${escapeHtml(project.subtitle)}</p>
      </header>

      <!-- Quick Metrics Bar -->
      <div class="case-metrics-bar">
        <div class="metric-cell">
          <span class="m-label">Role</span>
          <span class="m-val">${escapeHtml(project.role)}</span>
        </div>
        <div class="metric-cell">
          <span class="m-label">Target Architecture</span>
          <span class="m-val">${escapeHtml(project.hardwareTarget)}</span>
        </div>
        <div class="metric-cell">
          <span class="m-label">Timeline</span>
          <span class="m-val">${escapeHtml(project.year)}</span>
        </div>
      </div>

      <!-- Hero Visual -->
      ${visualBanner}

      <!-- Executive Overview -->
      <section class="case-section">
        <h2 class="case-section-heading">Project Overview</h2>
        <p class="case-text lead">${escapeHtml(project.overview)}</p>
      </section>

      <!-- Problem & Solution Grid -->
      <div class="case-split-grid">
        <div class="case-split-card double-bezel">
          <div class="double-bezel-inner">
            <span class="card-eyebrow">The Problem</span>
            <h3 class="card-heading">Why this matters</h3>
            <p class="case-text">${escapeHtml(project.problemStatement)}</p>
          </div>
        </div>
        <div class="case-split-card double-bezel">
          <div class="double-bezel-inner">
            <span class="card-eyebrow">Engineering Solution</span>
            <h3 class="card-heading">Technical approach</h3>
            <p class="case-text">${escapeHtml(project.solution)}</p>
          </div>
        </div>
      </div>

      <!-- System Architecture & Flow -->
      <section class="case-section">
        <h2 class="case-section-heading">System Architecture</h2>
        <p class="case-text">${escapeHtml(project.architecture.summary)}</p>
        <div class="arch-flow-container">
          ${archNodesHtml}
        </div>
      </section>

      <!-- Technology Stack -->
      <section class="case-section">
        <h2 class="case-section-heading">Documented Technology Stack</h2>
        <div class="tech-chip-grid">
          ${techChips}
        </div>
      </section>

      <!-- Key Engineering Decisions -->
      <section class="case-section">
        <h2 class="case-section-heading">Key Technical Decisions & Engineering Challenges</h2>
        <div class="decisions-stack">
          ${decisionsHtml}
        </div>
      </section>

      <!-- Technical Accuracy & Truthfulness Disclaimer -->
      <div class="case-disclaimer-box">
        <div class="disclaimer-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Technical Verification & Accuracy Notes</span>
        </div>
        <p class="disclaimer-text">${escapeHtml(project.technicalAccuracyNote)}</p>
      </div>

      <!-- Future Roadmap -->
      <section class="case-section">
        <h2 class="case-section-heading">Future Roadmap</h2>
        <ul class="roadmap-list">
          ${project.futureRoadmap.map(r => `<li><span class="arrow-dot">→</span> ${escapeHtml(r)}</li>`).join('')}
        </ul>
      </section>

      <!-- Bottom CTAs -->
      <div class="case-study-footer-actions">
        ${githubBtn}
        <a href="#contact" class="btn-secondary-pill" onclick="document.getElementById('case-study-close').click();">
          <span>Discuss This Architecture</span>
        </a>
      </div>

      <!-- Navigation to Next / Previous Case Study -->
      <nav class="case-study-nav-footer">
        <button class="nav-case-btn prev" data-prev-case="${prevProject.id}">
          <span class="nav-dir">← Previous Project</span>
          <span class="nav-proj-title">${escapeHtml(prevProject.title)}</span>
        </button>
        <button class="nav-case-btn next" data-next-case="${nextProject.id}">
          <span class="nav-dir">Next Project →</span>
          <span class="nav-proj-title">${escapeHtml(nextProject.title)}</span>
        </button>
      </nav>
    </article>
  `;
}

function renderInteractiveVisual(project) {
  if (project.visualKind === 'geospatial') {
    return `
      <div class="tech-visual-card double-bezel">
        <div class="double-bezel-inner geospatial-visual">
          <div class="telemetry-bar">
            <span class="pulse-indicator"></span>
            <span class="telemetry-label">SATQUERY TELEMETRY // CRS EPSG:4326 // VRAM: 4.8 / 6.0 GB</span>
          </div>
          <div class="geospatial-canvas-mock">
            <div class="map-grid-overlay"></div>
            <div class="scan-line"></div>
            <div class="bounding-box b-1">
              <span class="bb-label">Florence-2 Grounding [98.2%]</span>
            </div>
            <div class="bounding-box b-2">
              <span class="bb-label">TinyCD Change Detection [Δ +14.6%]</span>
            </div>
            <div class="terminal-overlay">
              <code>> Decomposing query: 'Analyze river parcel erosion'</code><br/>
              <code>> Offloading Florence-2 weights from VRAM</code><br/>
              <code>> Allocating MobileSAM fp16 tensor buffers</code><br/>
              <code>> Generating valid GeoJSON polygon stream...</code>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (project.visualKind === 'commerce') {
    return `
      <div class="tech-visual-card double-bezel">
        <div class="double-bezel-inner commerce-visual">
          <div class="telemetry-bar">
            <span class="pulse-indicator green"></span>
            <span class="telemetry-label">OWNLY LEDGER // INTEGER-PAISE ARITHMETIC // SOCKET.IO ACTIVE</span>
          </div>
          <div class="commerce-ledger-mock">
            <div class="ledger-row head">
              <span>CONTRIBUTOR</span>
              <span>SHARES (BP)</span>
              <span>AMOUNT (PAISE)</span>
              <span>STATUS</span>
            </div>
            <div class="ledger-row">
              <span>Member A (Lead)</span>
              <span>3,500 bp (35.0%)</span>
              <span>₹17,500.00</span>
              <span class="tag-verified">Verified</span>
            </div>
            <div class="ledger-row">
              <span>Member B</span>
              <span>3,500 bp (35.0%)</span>
              <span>₹17,500.00</span>
              <span class="tag-verified">Verified</span>
            </div>
            <div class="ledger-row">
              <span>Member C</span>
              <span>3,000 bp (30.0%)</span>
              <span>₹15,000.00</span>
              <span class="tag-verified">Verified</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="tech-visual-card double-bezel">
      <div class="double-bezel-inner generic-tech-visual">
        <div class="telemetry-bar">
          <span class="pulse-indicator"></span>
          <span class="telemetry-label">${escapeHtml(project.title.toUpperCase())} // ARCHITECTURE TELEMETRY</span>
        </div>
        <div class="code-preview-block">
          <pre><code>// System Specification & Runtime Verification
Target: ${project.hardwareTarget}
Status: ${project.status}
Stack:  ${project.technologies.slice(0, 4).join(', ')}</code></pre>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   CREATIVE WORK MODAL
   ========================================================================== */
function initCreativeModal() {
  const modal = document.getElementById('creative-modal');
  const closeBtn = document.getElementById('creative-close');
  const modalBody = document.getElementById('creative-body');
  if (!modal || !modalBody) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-creative-id]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-creative-id');
      const item = creativeWork.find(c => c.id === id);
      if (item) {
        modalBody.innerHTML = `
          <div class="creative-detail-header">
            <span class="c-category">${escapeHtml(item.category)}</span>
            <h2 class="c-title">${escapeHtml(item.title)}</h2>
            <div class="c-client-tag">Client: <strong>${escapeHtml(item.client)}</strong> · ${escapeHtml(item.year)}</div>
          </div>

          <div class="creative-callout-result">
            <span class="res-eyebrow">Client Engagement &amp; Verified Delivery</span>
            <p class="res-highlight">"${escapeHtml(item.outcome)}"</p>
            ${item.metrics ? `<div style="margin-top: 0.65rem; font-family: var(--font-mono); font-size: 0.78rem; color: #FF4D58; background: rgba(255, 26, 26, 0.08); padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid rgba(255, 26, 26, 0.2);">${escapeHtml(item.metrics)}</div>` : ''}
          </div>

          <div class="creative-detail-section">
            <h3 class="detail-label">Campaign Objective</h3>
            <p class="detail-p">${escapeHtml(item.objective)}</p>
          </div>

          <div class="creative-detail-section">
            <h3 class="detail-label">Creative Concept & Narrative</h3>
            <p class="detail-p">${escapeHtml(item.concept)}</p>
          </div>

          <div class="creative-roles-grid">
            <div class="role-box">
              <h4>Production & Cinematography</h4>
              <p>${escapeHtml(item.productionRole)}</p>
            </div>
            <div class="role-box">
              <h4>Post-Production & Editing</h4>
              <p>${escapeHtml(item.editingRole)}</p>
            </div>
          </div>

          <div class="creative-tools-wrap">
            <span class="tools-label">Tools & Equipment:</span>
            <div class="tools-chips">
              ${item.tools.map(t => `<span class="tool-chip">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>

          <div class="creative-disclaimer-note">
            <p>${escapeHtml(item.disclaimer)}</p>
          </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   LIVE IST CLOCK (Bhimavaram, Andhra Pradesh, India)
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-ist-clock');
  if (!clockEl) return;

  function update() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat([], options);
    clockEl.textContent = `${formatter.format(new Date())} IST (UTC+5:30)`;
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   CONTACT FORM HANDLER (Direct mailto generation)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('direct-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const category = form.querySelector('[name="category"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${category} from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${category}\n\nMessage:\n${message}\n\n-- Sent via sasirithvik.vercel.app`
    );

    window.location.href = `mailto:sasirithvik92@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ==========================================================================
   REACT BITS INTERACTIVE INTEGRATIONS
   TechText, FluxLines, Lanyard, StarBorder
   ========================================================================== */
let fluxInstance = null;
let lanyardInstance = null;
let techTextInstance = null;
const starBorderInstances = [];

function initInteractiveComponents() {
  // 1. FluxLines on Hero Background (WebGL2 Fluid Ambient Lines)
  const fluxContainer = document.getElementById('hero-flux-lines');
  if (fluxContainer) {
    try {
      fluxInstance = initFluxLines(fluxContainer, {
        colors: ['#E50914', '#D62828', '#8B0000', '#FF4D4D'],
        speed: 0.38,
        scale: 1.4,
        turbulence: 0.85,
        fluidity: 0.1,
        rimWidth: 0.22,
        sharpness: 2.2,
        shimmer: 1.1,
        glow: 1.6,
        lineWidth: 1.2,
        flowDirection: 'down',
        opacity: 0.55,
        mouseInteraction: true,
        mouseStrength: 1.1,
        mouseRadius: 0.35,
        mouseDampening: 0.15,
        clickSwirl: true,
        transparent: true
      });
    } catch (err) {
      console.warn('FluxLines initialization error:', err);
    }
  }

  // 2. Lanyard 3D Physics ID Badge (Three.js XPBD Physics Card)
  const lanyardContainer = document.getElementById('hero-lanyard-container');
  if (lanyardContainer) {
    try {
      lanyardInstance = initLanyard(lanyardContainer, {
        frontImage: 'assets/redz-portfolio-card.png',
        backImage: 'assets/redz-logo.png',
        imageFit: 'cover',
        cardColor: '#0E0E12',
        orientation: 'portrait',
        finish: 'glossy',
        size: 0.65,
        strapLength: 0.45,
        strapColor: '#0D0D11',
        strapWidth: 0.65,
        metal: 'silver',
        breeze: 0.35,
        bounce: 0.4
      });
    } catch (err) {
      console.warn('Lanyard initialization error:', err);
    }
  }

  // 3. TechText Interactive Canvas Blueprint Wordmark
  const techTextContainer = document.getElementById('tech-text-container');
  if (techTextContainer) {
    try {
      techTextInstance = initTechText(techTextContainer, {
        text: 'REDZ',
        fontWeight: 800,
        fontSize: 150,
        letterSpacing: 0.02,
        color: 'currentColor',
        accentColor: '#FF1A1A',
        reveal: 'letter',
        dashLength: 4,
        dashGap: 2,
        strokeWidth: 1.6,
        specks: 16,
        selection: true,
        labels: true,
        draggable: true,
        bounce: 0.45,
        clickKick: true,
        sweep: true,
        speed: 1.1,
        intro: 'assemble',
        introDuration: 1.8
      });
    } catch (err) {
      console.warn('TechText initialization error:', err);
    }
  }

  // 4. StarBorder on Interactive Action Buttons
  const starElements = document.querySelectorAll('.star-border');
  starElements.forEach(el => {
    try {
      const instance = initStarBorder(el, {
        duration: 3.8,
        stars: 1,
        glow: 0.8,
        sparkle: true,
        hover: 'lap',
        clickPulse: true,
        color: '#E50914',
        trailColor: '#D62828',
        thickness: 1.5
      });
      if (instance) starBorderInstances.push(instance);
    } catch (err) {
      console.warn('StarBorder initialization error:', err);
    }
  });

  // Listen for theme change to update StarBorder / FluxLines
  window.addEventListener('themechange', (e) => {
    const isLight = e.detail?.theme === 'light';
    starBorderInstances.forEach(inst => {
      inst.update({ light: isLight });
    });
  });
}

/* ==========================================================================
   REDz EXPANDABLE HUB & LIQUID GLASS INTERACTION SYSTEM
   ========================================================================== */
function initRedzHub() {
  const container = document.getElementById('redz-tab-content-container');
  const tabButtons = document.querySelectorAll('.redz-tab-btn');
  const tabPanels = document.querySelectorAll('.redz-tab-panel');
  const toggleAllBtn = document.getElementById('redz-toggle-all-btn');
  const accordionButtons = document.querySelectorAll('.btn-service-accordion');
  const quickExpandButtons = document.querySelectorAll('.btn-quick-expand');

  if (!container || !tabButtons.length) return;

  let isAllExpanded = false;

  // 1. Tab Switching
  function switchTab(targetTabId) {
    if (isAllExpanded) {
      setAllExpanded(false);
    }

    tabButtons.forEach(btn => {
      const match = btn.getAttribute('data-tab') === targetTabId;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    tabPanels.forEach(panel => {
      const match = panel.id === targetTabId;
      panel.classList.toggle('active', match);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      if (targetTabId) switchTab(targetTabId);
    });
  });

  // 2. Expand All / Collapse View Toggle
  function setAllExpanded(expand) {
    isAllExpanded = expand;
    container.classList.toggle('redz-view-all-expanded', expand);

    if (toggleAllBtn) {
      toggleAllBtn.classList.toggle('active', expand);
      toggleAllBtn.setAttribute('aria-pressed', expand ? 'true' : 'false');
      toggleAllBtn.innerHTML = expand
        ? '<span class="toggle-all-icon">⤡</span><span class="toggle-all-text">Collapse to Tabs</span>'
        : '<span class="toggle-all-icon">⤢</span><span class="toggle-all-text">Expand All Details</span>';
    }

    // When expanding all, expand all service and client accordions too!
    accordionButtons.forEach(btn => {
      const bullets = btn.nextElementSibling;
      if (bullets && bullets.classList.contains('service-bullets')) {
        btn.setAttribute('aria-expanded', expand ? 'true' : 'false');
        bullets.classList.toggle('collapsed', !expand);
        const label = btn.querySelector('.btn-accordion-label');
        if (label) label.textContent = expand ? 'Hide Deliverables' : 'View Deliverables';
      }
    });

    quickExpandButtons.forEach(btn => {
      const parentCard = btn.closest('.client-case-card');
      const breakdown = parentCard ? parentCard.querySelector('.client-quick-breakdown') : null;
      if (breakdown) {
        btn.setAttribute('aria-expanded', expand ? 'true' : 'false');
        breakdown.classList.toggle('collapsed', !expand);
        const spanText = btn.querySelector('span:first-child');
        if (spanText) spanText.textContent = expand ? 'Hide Breakdown' : 'Quick Breakdown';
      }
    });

    if (expand) {
      // Highlight all tab buttons to indicate expanded panoramic view
      tabButtons.forEach(b => {
        b.classList.add('active');
        b.setAttribute('aria-selected', 'true');
      });
    } else {
      // Reset to active tab
      const firstTab = tabButtons[0]?.getAttribute('data-tab') || 'tab-services';
      switchTab(firstTab);
    }
  }

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      setAllExpanded(!isAllExpanded);
    });
  }

  // 3. Individual Service Accordions
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bullets = btn.nextElementSibling;
      if (!bullets || !bullets.classList.contains('service-bullets')) return;

      const isCollapsed = bullets.classList.contains('collapsed');
      bullets.classList.toggle('collapsed', !isCollapsed);
      btn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');

      const label = btn.querySelector('.btn-accordion-label');
      if (label) {
        label.textContent = isCollapsed ? 'Hide Deliverables' : 'View Deliverables';
      }
    });
  });

  // 4. Individual Client Quick Breakdowns
  quickExpandButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.client-case-card');
      if (!parentCard) return;
      const breakdown = parentCard.querySelector('.client-quick-breakdown');
      if (!breakdown) return;

      const isCollapsed = breakdown.classList.contains('collapsed');
      breakdown.classList.toggle('collapsed', !isCollapsed);
      btn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');

      const spanText = btn.querySelector('span:first-child');
      if (spanText) {
        spanText.textContent = isCollapsed ? 'Hide Breakdown' : 'Quick Breakdown';
      }
    });
  });

  // 5. Deep link routing (e.g. from hero "Explore REDz Work" button)
  document.querySelectorAll('a[href="#redz-client-work"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Ensure tab-clients is active
      switchTab('tab-clients');
      // Allow smooth scroll to occur naturally or assist if needed
      setTimeout(() => {
        const clientSec = document.getElementById('redz-client-work');
        if (clientSec) {
          clientSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
  });
}

/* ==========================================================================
   UTILITIES
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

