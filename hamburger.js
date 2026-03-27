/**
 * ============================================================
 * hamburger.js - Hamburger Menu Functionality
 * ============================================================
 * Changed by kilo ai
 * 
 * This file handles the hamburger menu toggle functionality
 * for mobile/responsive navigation.
 * ============================================================
 */

// Changed by kilo ai - Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    
    // Changed by kilo ai - Get DOM elements for hamburger toggle and navigation
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navigation = document.getElementById('navigation');
    const navOverlay = document.getElementById('nav-overlay');
    
    // Changed by kilo ai - Check if elements exist before adding event listeners
    if (hamburgerToggle && navigation) {
        
        // Changed by kilo ai - Toggle hamburger menu on click
        hamburgerToggle.addEventListener('click', function() {
            // Toggle active class on hamburger button for animation
            hamburgerToggle.classList.toggle('active');
            
            // Toggle active class on navigation for slide-in effect
            navigation.classList.toggle('active');
            
            // Changed by kilo ai - Toggle overlay visibility
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            
            // Changed by kilo ai - Toggle aria-expanded for accessibility
            const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
            hamburgerToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Changed by kilo ai - Close menu when clicking on navigation links (for mobile)
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Only close on mobile (when hamburger is visible)
                if (window.innerWidth <= 992) {
                    hamburgerToggle.classList.remove('active');
                    navigation.classList.remove('active');
                    if (navOverlay) navOverlay.classList.remove('active');
                    hamburgerToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Changed by kilo ai - Close menu when clicking on overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', function() {
                hamburgerToggle.classList.remove('active');
                navigation.classList.remove('active');
                navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            });
        }
        
        // Changed by kilo ai - Close menu when clicking outside navigation
        document.addEventListener('click', function(event) {
            if (!navigation.contains(event.target) && !hamburgerToggle.contains(event.target) && (!navOverlay || !navOverlay.contains(event.target))) {
                hamburgerToggle.classList.remove('active');
                navigation.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Changed by kilo ai - Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                hamburgerToggle.classList.remove('active');
                navigation.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Changed by kilo ai - Add keyboard accessibility (Enter and Space keys)
        hamburgerToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                hamburgerToggle.click();
            }
        });
    }
    
    // Changed by kilo ai - Handle Escape key to close menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (hamburgerToggle && navigation) {
                hamburgerToggle.classList.remove('active');
                navigation.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                hamburgerToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

console.log('Changed by kilo ai - hamburger.js loaded successfully');
