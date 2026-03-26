// Profile section toggle logic with enhanced styles and menu.css color theme & modern font upgrades

document.addEventListener("DOMContentLoaded", function () {
    // Get the Profile nav button & Profile Section
    const profileLink = document.querySelector("header .profile a[href='#profile-section']");
    const profileSection = document.getElementById("profile-section");

    // Early return if html not present
    if (!profileSection || !profileLink)
        return;

    // === THEME & ENHANCED STYLE APPLY ===

    // Hide on load
    profileSection.style.display = "none";
    profileSection.style.position = "fixed";
    profileSection.style.top = "0";
    profileSection.style.left = "0";
    profileSection.style.width = "100vw";
    profileSection.style.height = "100vh";
    profileSection.style.background = "linear-gradient(135deg, #E6F0DC 70%, #C1E899 100%)"; // var(--color-mint) to var(--color-lime) from menu.css
    profileSection.style.zIndex = "99999";
    profileSection.style.overflowY = "auto";
    profileSection.style.justifyContent = "center";
    profileSection.style.alignItems = "center";
    profileSection.style.paddingTop = "7vh";
    profileSection.style.backdropFilter = "blur(3px)";
    profileSection.style.transition = "opacity .23s, filter .23s";

    // Animate profile panel fade-in
    profileSection.style.opacity = "0";

    // Add a subtle inner border for a card/glass look
    profileSection.style.boxShadow = "0 0 0 999vw rgba(85,136,59,.10) inset";

    // Target the real profile form card and give a more modern/fun look 
    const container = profileSection.querySelector(".profile-container");
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
    // Style modern heading
    const heading = profileSection.querySelector(".profile-container h2");
    if (heading) {
        heading.style.fontFamily = "'Playfair Display', cursive, serif";
        heading.style.background = "linear-gradient(90deg, #9A6735 8%, #55883B 72%)";
        heading.style.color = "white";
        heading.style.borderRadius = "12px";
        heading.style.padding = "0.16em 0.48em";
        heading.style.marginBottom = "1.8rem";
        heading.style.textShadow = "0 3px 10px #b86b2820";
        heading.style.letterSpacing = "0.01em";
        heading.style.fontSize = "1.6rem";
        heading.style.fontWeight = "700";
        heading.style.boxShadow = "0 3px 12px 0 rgba(85,136,59,0.14)";
    }
    // Animate form elements (hover highlights with theme)
    const form = profileSection.querySelector(".profile-form");
    if (form) {
        form.style.fontFamily = "'Jost', 'Montserrat', sans-serif";
        const inputs = form.querySelectorAll("input, button");
        inputs.forEach(el => {
            el.style.fontFamily = "'Jost', 'Montserrat', sans-serif";
        });
        const btn = form.querySelector("button[type='submit']");
        if (btn) {
            btn.style.background = "linear-gradient(92deg,var(--color-accent),var(--color-forest) 85%)";
            btn.style.fontWeight = "700";
            btn.style.letterSpacing = ".04em";
            btn.style.transition = "background .21s, box-shadow .18s";
            btn.style.boxShadow = "0 4px 16px 0 #b86b2820";
        }
        // Labels: earth tone 
        const labels = form.querySelectorAll("label");
        labels.forEach(lbl => {
            lbl.style.color = "#9A6735";
            lbl.style.letterSpacing = ".03em";
        });
        // Input fields (subtle green border)
        const inputFields = form.querySelectorAll("input");
        inputFields.forEach(inp => {
            inp.style.border = "1.7px solid #55883B";
            inp.style.background = "linear-gradient(99deg,#fff 84%,#C1E899 100%)";
        });
    }

    // === CREATE EXIT ("X") BUTTON ===
    let closeBtn = profileSection.querySelector(".profile-exit-btn");
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

    // === TOGGLE LOGIC ===

    // Fade in display
    profileLink.addEventListener("click", function (e) {
        e.preventDefault();
        profileSection.style.display = "flex";
        setTimeout(() => {
            profileSection.style.opacity = "1";
            profileSection.style.filter = "blur(0)";
        }, 15);
        document.body.style.overflow = "hidden";
    });
    // Hide on close button
    closeBtn.addEventListener("click", function () {
        profileSection.style.opacity = "0";
        setTimeout(() => {
            profileSection.style.display = "none";
            document.body.style.overflow = "";
        }, 200);
    });
    // Hide if click off card
    profileSection.addEventListener("click", function (e) {
        const formContainer = profileSection.querySelector(".profile-container");
        if (
            e.target === profileSection &&
            formContainer &&
            !formContainer.contains(e.target)
        ) {
            profileSection.style.opacity = "0";
            setTimeout(() => {
                profileSection.style.display = "none";
                document.body.style.overflow = "";
            }, 200);
        }
    });
    // Hide with Esc key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && profileSection.style.display === "flex") {
            profileSection.style.opacity = "0";
            setTimeout(() => {
                profileSection.style.display = "none";
                document.body.style.overflow = "";
            }, 200);
        }
    });
});
