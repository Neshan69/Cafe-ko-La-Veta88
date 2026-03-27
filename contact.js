/**
 * ============================================================
 * contact.js - Contact Form Validation
 * ============================================================
 * Changed by kilo ai
 * 
 * This file handles the contact form validation using
 * Bootstrap 5 client-side validation.
 * ============================================================
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        var form = document.getElementById('contactForm');
        if(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        }
    });
})();
