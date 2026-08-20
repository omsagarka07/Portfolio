/* =========================================================
   OM SAGARKA PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("theme-toggle");

const scrollTopBtn = document.getElementById("scroll-top");

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const sections = document.querySelectorAll("section[id]");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuBtn.classList.toggle("active", isOpen);

        menuBtn.setAttribute("aria-expanded", isOpen);

        const icon = menuBtn.querySelector("i");

        if (icon) {

            if (isOpen) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", event => {

    if (!navMenu || !menuBtn) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (
        navMenu.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navMenu.classList.remove("active");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

});


/* =========================================================
   CLOSE MOBILE MENU WITH ESC KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

});


/* =========================================================
   HANDLE WINDOW RESIZE
========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 950) {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuBtn) {

            menuBtn.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    }

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

function updateActiveNav() {

    let currentSection = "";

    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   SCROLL EVENT
========================================================= */

let ticking = false;

window.addEventListener("scroll", () => {

    if (!ticking) {

        window.requestAnimationFrame(() => {

            updateActiveNav();

            handleScrollTop();

            ticking = false;

        });

        ticking = true;

    }

});


/* =========================================================
   INITIAL ACTIVE NAV
========================================================= */

updateActiveNav();


/* =========================================================
   DARK MODE
========================================================= */

function setTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {

        const icon = themeToggle.querySelector("i");

        if (icon) {

            if (isDark) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

            }

        }

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }

}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    setTheme("dark");

} else {

    setTheme("light");

}


/* =========================================================
   THEME TOGGLE
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isDark =
            document.body.classList.contains("dark-mode");

        const newTheme = isDark ? "light" : "dark";

        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);

    });

}


/* =========================================================
   SCROLL TO TOP
========================================================= */

function handleScrollTop() {

    if (!scrollTopBtn) return;

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

}


if (scrollTopBtn) {

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();


        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");


        const name = nameInput
            ? nameInput.value.trim()
            : "";

        const email = emailInput
            ? emailInput.value.trim()
            : "";

        const subject = subjectInput
            ? subjectInput.value.trim()
            : "";

        const message = messageInput
            ? messageInput.value.trim()
            : "";


        /* Basic validation */

        if (!name) {

            showFormMessage(
                "Please enter your name.",
                "error"
            );

            nameInput.focus();

            return;

        }


        if (!email) {

            showFormMessage(
                "Please enter your email.",
                "error"
            );

            emailInput.focus();

            return;

        }


        if (!isValidEmail(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;

        }


        if (!subject) {

            showFormMessage(
                "Please enter a subject.",
                "error"
            );

            subjectInput.focus();

            return;

        }


        if (!message) {

            showFormMessage(
                "Please enter your message.",
                "error"
            );

            messageInput.focus();

            return;

        }


        /*
         * Front-end only form.
         * No message is actually sent to a server.
         */

        showFormMessage(
            `Thanks ${name}! Your message has been prepared successfully.`,
            "success"
        );


        contactForm.reset();

    });

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(message, type) {

    if (!formMessage) return;

    formMessage.textContent = message;

    formMessage.classList.remove(
        "success",
        "error"
    );

    formMessage.classList.add(type);


    setTimeout(() => {

        formMessage.classList.remove(
            "success",
            "error"
        );

    }, 5000);

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".info-card, " +
    ".project-card, " +
    ".cert-card, " +
    ".timeline-item, " +
    ".skill-category, " +
    ".contact-item"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin: "0px 0px -50px 0px"

        }

    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    /* Fallback for old browsers */

    revealElements.forEach(element => {

        element.classList.add("reveal-show");

    });

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId =
            anchor.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const header =
            document.querySelector(".header");


        const headerHeight =
            header
                ? header.offsetHeight
                : 75;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

const profileImage =
    document.querySelector(".image-circle img");


if (profileImage) {

    profileImage.addEventListener("error", () => {

        profileImage.style.display = "none";

        const imageCircle =
            document.querySelector(".image-circle");

        if (imageCircle) {

            imageCircle.classList.add(
                "image-error"
            );

        }

    });

}


/* =========================================================
   PREVENT EMPTY EXTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(link => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =========================================================
   PAGE LOADED
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);