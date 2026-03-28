/**
 * hamburger.js — La-Veta88
 * Clean external hamburger / mobile nav controller.
 * Uses .lv-open class exclusively (no display toggling).
 * Compatible with Bootstrap 5 desktop dropdown hover.
 */

(function () {
    'use strict';
  
    document.addEventListener('DOMContentLoaded', function () {
  
      /* ── Element refs ─────────────────────────────────── */
      const hamburger      = document.getElementById('lv-hamburger');
      const nav            = document.getElementById('lv-navigation');
      const overlay        = document.getElementById('lv-nav-overlay');
      const closeBtn       = document.getElementById('lv-nav-close');
      const servicesToggle = document.getElementById('lv-services-toggle');
      const servicesMenu   = document.getElementById('lv-services-menu');
      const header         = document.getElementById('lv-header');
  
      if (!hamburger || !nav) {
        console.warn('hamburger.js: required elements not found.');
        return;
      }
  
      /* ── Helpers ──────────────────────────────────────── */
      function isMobile() {
        return window.innerWidth <= 992;
      }
  
      function openNav() {
        hamburger.classList.add('lv-open');
        nav.classList.add('lv-open');
        if (overlay) overlay.classList.add('lv-open');
        hamburger.setAttribute('aria-expanded', 'true');
        /* iOS scroll-lock: record position, fix body */
        document.body.dataset.scrollY = window.scrollY;
        document.body.style.top = '-' + window.scrollY + 'px';
        document.body.classList.add('lv-nav-open');
      }
  
      function closeNav() {
        hamburger.classList.remove('lv-open');
        nav.classList.remove('lv-open');
        if (overlay) overlay.classList.remove('lv-open');
        hamburger.setAttribute('aria-expanded', 'false');
        /* Restore scroll */
        const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
        document.body.classList.remove('lv-nav-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
        /* Also close services submenu */
        if (servicesMenu) servicesMenu.classList.remove('lv-sub-open');
        if (servicesToggle) servicesToggle.setAttribute('aria-expanded', 'false');
      }
  
      function toggleNav() {
        nav.classList.contains('lv-open') ? closeNav() : openNav();
      }
  
      /* ── Hamburger button ─────────────────────────────── */
      hamburger.addEventListener('click', toggleNav);
  
      /* Keyboard: Enter / Space */
      hamburger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleNav();
        }
      });
  
      /* ── Close button (inside sidebar) ───────────────── */
      if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
      }
  
      /* ── Overlay click ────────────────────────────────── */
      if (overlay) {
        overlay.addEventListener('click', closeNav);
      }
  
      /* ── Escape key ───────────────────────────────────── */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('lv-open')) {
          closeNav();
        }
      });
  
      /* ── Close on nav link click (mobile) ────────────── */
      nav.querySelectorAll('a:not(#lv-services-toggle)').forEach(function (link) {
        link.addEventListener('click', function () {
          if (isMobile()) closeNav();
        });
      });
  
      /* ── Services submenu (mobile: manual toggle) ─────── 
         On desktop Bootstrap's hover CSS handles the dropdown.
         On mobile we manually toggle .lv-sub-open to avoid
         Bootstrap stealing the click and breaking the sidebar. */
      if (servicesToggle && servicesMenu) {
        servicesToggle.addEventListener('click', function (e) {
          if (isMobile()) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = servicesMenu.classList.contains('lv-sub-open');
            servicesMenu.classList.toggle('lv-sub-open', !isOpen);
            servicesToggle.setAttribute('aria-expanded', String(!isOpen));
          }
        });
  
        /* Close submenu + sidebar when a service item is clicked */
        servicesMenu.querySelectorAll('.dropdown-item').forEach(function (item) {
          item.addEventListener('click', function () {
            if (isMobile()) closeNav();
          });
        });
      }
  
      /* ── Resize: reset state when returning to desktop ── */
      window.addEventListener('resize', function () {
        if (!isMobile() && nav.classList.contains('lv-open')) {
          closeNav();
        }
      });
  
      /* ── Active link on scroll ────────────────────────── */
      var sections = Array.from(document.querySelectorAll('section[id], div[id]'));
      var navLinks = Array.from(nav.querySelectorAll('ul > li > a:not(.dropdown-toggle)'));
  
      function updateActive() {
        var current = '';
        sections.forEach(function (sec) {
          if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        navLinks.forEach(function (link) {
          var href = link.getAttribute('href');
          link.classList.toggle('active', href === '#' + current);
        });
      }
  
      window.addEventListener('scroll', updateActive, { passive: true });
      updateActive();
  
      /* ── Header shadow on scroll ──────────────────────── */
      if (header) {
        window.addEventListener('scroll', function () {
          header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
      }
  
    }); // end DOMContentLoaded
  
  })();