/**
 * ============================================================
 * profile.js - Auth & Profile Section Functionality
 * ============================================================
 * Changed by kilo ai
 *
 * Handles:
 * - Login / Register fast tab switching
 * - Profile section overlay toggle (index.html)
 * - Form submissions
 * - Preloader
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // LOGIN / REGISTER TAB SWITCHING (FAST)
    // ============================================================

    const authTabs = document.querySelectorAll(".auth-tab");
    const authForms = document.querySelectorAll(".auth-form");
    const tabIndicator = document.querySelector(".auth-tab-indicator");

    function switchTab(targetTab) {
        authTabs.forEach(function (t) { t.classList.remove("active"); });
        authForms.forEach(function (f) { f.classList.remove("active"); });

        var activeTab = document.querySelector('.auth-tab[data-tab="' + targetTab + '"]');
        var activeForm = document.querySelector('.auth-form[data-form="' + targetTab + '"]');

        if (activeTab) activeTab.classList.add("active");
        if (activeForm) activeForm.classList.add("active");

        // Move indicator
        if (tabIndicator && activeTab) {
            tabIndicator.style.left = activeTab.offsetLeft + "px";
            tabIndicator.style.width = activeTab.offsetWidth + "px";
        }

        // Hide any visible messages
        document.querySelectorAll(".success-message, .error-message").forEach(function (m) {
            m.style.display = "none";
        });
    }

    // Tab button clicks
    authTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            switchTab(this.dataset.tab);
        });
    });

    // Inline link switches
    document.querySelectorAll(".switch-to-register").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            switchTab("register");
        });
    });

    document.querySelectorAll(".switch-to-login").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            switchTab("login");
        });
    });

    // Position indicator on load
    if (tabIndicator) {
        var initTab = document.querySelector(".auth-tab.active");
        if (initTab) {
            tabIndicator.style.left = initTab.offsetLeft + "px";
            tabIndicator.style.width = initTab.offsetWidth + "px";
        }
    }

    // Re-position on resize
    window.addEventListener("resize", function () {
        if (tabIndicator) {
            var current = document.querySelector(".auth-tab.active");
            if (current) {
                tabIndicator.style.left = current.offsetLeft + "px";
                tabIndicator.style.width = current.offsetWidth + "px";
            }
        }
    });

    // ============================================================
    // LOGIN FORM SUBMISSION
    // ============================================================

    var loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var email = document.getElementById("login-email").value.trim();
            var password = document.getElementById("login-password").value.trim();

            if (!email || !password) return;

            var successEl = document.getElementById("login-success");
            var errorEl = document.getElementById("login-error");

            // Demo: show success
            if (successEl) successEl.style.display = "block";
            if (errorEl) errorEl.style.display = "none";
        });
    }

    // ============================================================
    // REGISTER FORM SUBMISSION
    // ============================================================

    var registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = document.getElementById("reg-name").value.trim();
            var email = document.getElementById("reg-email").value.trim();
            var phone = document.getElementById("reg-phone").value.trim();

            if (!name || !email) return;

            var successEl = document.getElementById("register-success");
            var errorEl = document.getElementById("register-error");

            alert(
                "Demo mode — registration data:\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Phone: " + phone + "\n" +
                "[Password hidden]"
            );

            if (successEl) successEl.style.display = "block";
            if (errorEl) errorEl.style.display = "none";
        });
    }

    // ============================================================
    // PRELOADER — REVIEW: Moved to main.js for min-show-time logic — Kilo AI
    // ============================================================
    // PROFILE SECTION OVERLAY TOGGLE (index.html)
    // ============================================================

    var profileLink = document.querySelector("header .profile a[href='#profile-section']");
    var profileSection = document.getElementById("profile-section");

    if (!profileSection || !profileLink) return;

    // Apply overlay styles
    var s = profileSection.style;
    s.display = "none";
    s.position = "fixed";
    s.top = "0";
    s.left = "0";
    s.width = "100vw";
    s.height = "100vh";
    s.background = "linear-gradient(135deg, #E6F0DC 70%, #C1E899 100%)";
    s.zIndex = "99999";
    s.overflowY = "auto";
    s.justifyContent = "center";
    s.alignItems = "center";
    s.paddingTop = "7vh";
    s.backdropFilter = "blur(3px)";
    s.transition = "opacity .18s ease, filter .18s ease";
    s.opacity = "0";
    s.boxShadow = "0 0 0 999vw rgba(85,136,59,.10) inset";

    // Style container
    var container = profileSection.querySelector(".profile-container");
    if (container) {
        container.style.background = "linear-gradient(122deg,#fff 80%,#E6F0DC 100%)";
        container.style.borderRadius = "22px";
        container.style.boxShadow = "0 16px 48px 0 rgba(154,103,53,0.11), 0 2px 22px #b86b2814";
        container.style.fontFamily = "'Jost', 'Montserrat', 'Roboto', sans-serif";
        container.style.color = "#1e2e14";
        container.style.border = "2px solid #C1E899";
        container.style.position = "relative";
        container.style.overflow = "visible";
        container.style.transition = "box-shadow .25s";
    }

    // Style tabs
    var tabsContainer = profileSection.querySelector(".auth-tabs");
    if (tabsContainer) {
        tabsContainer.style.display = "flex";
        tabsContainer.style.position = "relative";
        tabsContainer.style.marginBottom = "1.5rem";
    }

    // Create close button
    var closeBtn = profileSection.querySelector(".profile-exit-btn");
    if (!closeBtn) {
        closeBtn = document.createElement("button");
        closeBtn.innerHTML = '<span aria-label="Close" style="font-size:2.2em;">&times;</span>';
        closeBtn.className = "profile-exit-btn";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "26px";
        closeBtn.style.right = "38px";
        closeBtn.style.background = "linear-gradient(120deg, #9A6735 41%, #55883B 100%)";
        closeBtn.style.border = "none";
        closeBtn.style.fontSize = "2.1em";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.zIndex = "100002";
        closeBtn.style.color = "white";
        closeBtn.style.lineHeight = "1";
        closeBtn.style.padding = ".16em .36em";
        closeBtn.style.borderRadius = "100px";
        closeBtn.setAttribute("aria-label", "Close profile form");
        closeBtn.style.transition = "background .26s, box-shadow .16s";
        closeBtn.onmouseover = function () {
            closeBtn.style.background = "linear-gradient(110deg, #55883B 7%, #9A6735 92%)";
            closeBtn.style.boxShadow = "0 4px 18px #55883B30";
        };
        closeBtn.onmouseleave = function () {
            closeBtn.style.background = "linear-gradient(120deg, #9A6735 41%, #55883B 100%)";
            closeBtn.style.boxShadow = "";
        };
        profileSection.appendChild(closeBtn);
    }

    // Open overlay
    profileLink.addEventListener("click", function (e) {
        e.preventDefault();
        profileSection.style.display = "flex";
        requestAnimationFrame(function () {
            profileSection.style.opacity = "1";
            profileSection.style.filter = "blur(0)";
        });
        document.body.style.overflow = "hidden";
    });

    // Close via button
    closeBtn.addEventListener("click", function () {
        profileSection.style.opacity = "0";
        setTimeout(function () {
            profileSection.style.display = "none";
            document.body.style.overflow = "";
        }, 180);
    });

    // Close via backdrop click
    profileSection.addEventListener("click", function (e) {
        if (e.target === profileSection) {
            profileSection.style.opacity = "0";
            setTimeout(function () {
                profileSection.style.display = "none";
                document.body.style.overflow = "";
            }, 180);
        }
    });

    // Close via Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && profileSection.style.display === "flex") {
            profileSection.style.opacity = "0";
            setTimeout(function () {
                profileSection.style.display = "none";
                document.body.style.overflow = "";
            }, 180);
        }
    });
});
