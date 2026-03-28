/* ============================================================
   NAVBAR — Scroll, Hamburger, Active Link, Search
   ============================================================ */

   document.addEventListener('DOMContentLoaded', function () {
    var logoBtn = document.querySelector('.re-load');
    if (!logoBtn) return;
   
    logoBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // Navigate to current URL + #menu hash, then reload
      // This causes page to reload and jump to #menu
      var base = window.location.pathname + window.location.search;
      window.location.href = base + '#menu';
      // Small timeout to ensure the hash is applied before reload
      setTimeout(function () { window.location.reload(); }, 50);
    });
  });
   document.addEventListener('DOMContentLoaded', () => {

    const header    = document.querySelector('header');
    const hamburger = document.getElementById('hamburger-toggle');
    const navBar    = document.getElementById('navigation');
    const searchBar = document.querySelector('.search-bar');
    const navLinks  = document.querySelectorAll('#navigation ul > li > a:not(.dropdown-toggle), #navigation .dropdown-item');

    if (!header || !hamburger || !navBar) {
        console.warn('Navbar: required elements not found.');
        return;
    }

    // ----------------------------------------------------------
    // 1. SCROLL — .scrolled on header
    // ----------------------------------------------------------
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once

    // ----------------------------------------------------------
    // 2. HAMBURGER toggle
    // ----------------------------------------------------------
    const isMenuOpen = () => hamburger.classList.contains('open');

    const openMenu = () => {
        hamburger.classList.add('open');
        navBar.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Close navigation menu');
    };

    const closeMenu = () => {
        hamburger.classList.remove('open');
        navBar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
    };

    const toggleMenu = () => isMenuOpen() ? closeMenu() : openMenu();

    // click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // keyboard — Enter / Space
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // close on outside click
    document.addEventListener('click', (e) => {
        if (isMenuOpen() && !header.contains(e.target)) {
            closeMenu();
        }
    });

    // close when a nav link is clicked (mobile UX)
    document.querySelectorAll('#navigation ul > li > a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    // ----------------------------------------------------------
    // 3. ACTIVE LINK — highlight on scroll
    // ----------------------------------------------------------
    const sections = document.querySelectorAll('main section[id]');
    const mainNavLinks = document.querySelectorAll('#navigation ul > li > a:not(.dropdown-toggle)');

    const highlightLink = () => {
        let current = '';
        const scrollY = window.scrollY;
        const offset  = header.offsetHeight + 24;

        sections.forEach(section => {
            if (scrollY >= section.offsetTop - offset) {
                current = section.getAttribute('id');
            }
        });

        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightLink, { passive: true });
    highlightLink();

    // ----------------------------------------------------------
    // 4. SEARCH
    // ----------------------------------------------------------
    if (searchBar) {
        const searchInput = searchBar.querySelector('input');
        const searchBtn   = searchBar.querySelector('button[type="submit"]');

        const runSearch = () => {
            const query = searchInput?.value.trim();
            if (query) {
                console.log('Search:', query);
                // 👉 plug your search logic here
            }
        };

        searchBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            runSearch();
        });

        searchInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                runSearch();
            }
        });
    }

    // ----------------------------------------------------------
    // 5. RESIZE — close mobile menu if resized to desktop
    // ----------------------------------------------------------
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });

});

/* ============================================================
   SLIDER SECTION - Category Swiper (Moved from index.html)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Check if Swiper is available
    if (typeof Swiper !== 'undefined') {
        new Swiper(".categorySwiper", {
            loop: true,
            spaceBetween: 20,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                576: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                1200: {
                    slidesPerView: 4
                }
            }
        });
    }

    // Click helper animation - hide after 6 seconds
    setTimeout(() => {
        const helper = document.querySelector(".click-helper");
        if (helper) helper.style.display = "none";
    }, 6000);

    // Hide click/drag helpers on user interaction
    const categorySwiper = document.querySelector(".categorySwiper");
    if (categorySwiper) {
        categorySwiper.addEventListener("click", () => {
            const clickHelper = document.querySelector(".click-helper");
            const dragHelper = document.querySelector(".drag-helper");
            if (clickHelper) clickHelper.style.display = "none";
            if (dragHelper) dragHelper.style.display = "none";
        });

        categorySwiper.addEventListener("touchstart", () => {
            const clickHelper = document.querySelector(".click-helper");
            const dragHelper = document.querySelector(".drag-helper");
            if (clickHelper) clickHelper.style.display = "none";
            if (dragHelper) dragHelper.style.display = "none";
        });
    }
});

/* ============================================================
   REVIEW: PRELOADER — Fade out after page is ready — Kilo AI
   Shows for a minimum of 1.2s (branded feel), then hides
   when window.load fires (all resources loaded).
   ============================================================ */
(function () {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;

    var MIN_SHOW_MS = 1200;
    var startTime = Date.now();

    function hidePreloader() {
        var elapsed = Date.now() - startTime;
        var remaining = Math.max(0, MIN_SHOW_MS - elapsed);

        setTimeout(function () {
            preloader.classList.add('hidden');
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 600);
        }, remaining);
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
})();