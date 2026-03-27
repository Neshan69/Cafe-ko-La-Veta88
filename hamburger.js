/**
 * ============================================================
 * hamburger.js - Hamburger Menu Functionality
 * ============================================================
 * REVIEW: Aligned class names with main.js (.open instead of .active)
 * to prevent conflicting state. Both files now use consistent
 * class toggling. — Kilo AI
 * ============================================================
 */

// REVIEW: Wait for DOM before initializing — Kilo AI
document.addEventListener('DOMContentLoaded', function() {
    
    // REVIEW: Get DOM elements — Kilo AI
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navigation = document.getElementById('navigation');
    const navOverlay = document.getElementById('nav-overlay');
    
    // REVIEW: Guard clause — Kilo AI
    if (hamburgerToggle && navigation) {
        
        // REVIEW: Toggle uses .open class (consistent with main.js) — Kilo AI
        hamburgerToggle.addEventListener('click', function() {
            hamburgerToggle.classList.toggle('open');
            navigation.classList.toggle('open');
            
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            
            const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
            hamburgerToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // REVIEW: Close menu on nav link click (mobile) — Kilo AI
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    hamburgerToggle.classList.remove('open');
                    navigation.classList.remove('open');
                    if (navOverlay) navOverlay.classList.remove('active');
                    hamburgerToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // REVIEW: Close on overlay click — Kilo AI
        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                hamburgerToggle.classList.remove('open');
                navigation.classList.remove('open');
                navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            });
        }
        
        // REVIEW: Close on outside click — Kilo AI
        document.addEventListener('click', function(event) {
            if (!navigation.contains(event.target) && !hamburgerToggle.contains(event.target) && (!navOverlay || !navOverlay.contains(event.target))) {
                hamburgerToggle.classList.remove('open');
                navigation.classList.remove('open');
                if (navOverlay) navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // REVIEW: Close on resize to desktop — Kilo AI
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                hamburgerToggle.classList.remove('open');
                navigation.classList.remove('open');
                if (navOverlay) navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // REVIEW: Keyboard accessibility — Kilo AI
        hamburgerToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                hamburgerToggle.click();
            }
        });
    }
    
    // REVIEW: Escape key handler — Kilo AI
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (hamburgerToggle && navigation) {
                hamburgerToggle.classList.remove('open');
                navigation.classList.remove('open');
                if (navOverlay) navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

console.log('hamburger.js loaded (aligned with main.js — Kilo AI)');
