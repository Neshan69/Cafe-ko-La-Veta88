/**
 * ============================================================
 * dropdown.js - Bootstrap 5 Dropdown Hover Functionality
 * ============================================================
 * Changed by kilo ai
 * 
 * This file adds hover support for Bootstrap 5 dropdown menus
 * on desktop devices.
 * ============================================================
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        var dropdown = document.querySelector('.nav-item.dropdown');
        if (dropdown) {
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth >= 992) {
                    var menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.classList.add('show');
                    var link = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                    if (link) link.setAttribute('aria-expanded', 'true');
                }
            });
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth >= 992) {
                    var menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.classList.remove('show');
                    var link = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                    if (link) link.setAttribute('aria-expanded', 'false');
                }
            });
            // For accessibility: show dropdown on focus within
            dropdown.addEventListener('focusin', function() {
                if (window.innerWidth >= 992) {
                    var menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) menu.classList.add('show');
                    var link = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                    if (link) link.setAttribute('aria-expanded', 'true');
                }
            });
            dropdown.addEventListener('focusout', function() {
                if (window.innerWidth >= 992) {
                    setTimeout(function() {
                        // Wait for focus shift to check if still contains focus
                        if (!dropdown.contains(document.activeElement)) {
                            var menu = dropdown.querySelector('.dropdown-menu');
                            if (menu) menu.classList.remove('show');
                            var link = dropdown.querySelector('[data-bs-toggle="dropdown"]');
                            if (link) link.setAttribute('aria-expanded', 'false');
                        }
                    }, 150);
                }
            });
        }
    });
    
    // The following prompt will appear in the browser console to alert the developer to check and fix related issues:
    // [PROMPT] If you experience ANY issues with the Services dropdown:
    //    - Make sure the CSS for the header's nav dropdown is not being overridden in index.css!
    //    - Make sure to check functionality in hamburger/mobile mode (menu must remain accessible on click/touch).
    //    - If you use custom JS/CSS, ensure it's not interfering with Bootstrap's own dropdown handling.
    //    - If you make further changes in index.css, main.js, hamburger.js, or menu.js,
    //      please COMMENT your fixes with "/* FIX: ..." or "// FIX: ..." at every correction spot.
    
    // Prompt the developer via the console for further fixes in other files
    console.warn(`
[La-Veta88] SERVICES DROPDOWN FIX INSTRUCTIONS:

✅ [index.html] Now features CSS + JS support for dropdown on hover/focus (desktop).
❗ If your dropdown STILL doesn't work, please:
  - Check for CSS collisions or overrides in index.css and fix accordingly.
  - Ensure proper hamburger/mobility code in hamburger.js and nav rendering in main.js.
  - In menu.js, ensure it doesn't break navigation event propagation.
🔍 Please make every further fix in those files with explicit comments (e.g. /* FIX: ... */ or // FIX: ...).

When you need more help, prompt me with which file (and part) has issues!
    `);
})();
