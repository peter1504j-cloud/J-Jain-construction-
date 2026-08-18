/* ── Custom Cursor ─────────────────────────────────────────── */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

if (cursor && ring) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        ring.style.left = e.clientX + "px";
        ring.style.top = e.clientY + "px";
    });

    document
        .querySelectorAll(
            "a, button, .gallery-item, .material-card, .service-card"
        )
        .forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursor.style.width = "18px";
                cursor.style.height = "18px";

                ring.style.width = "52px";
                ring.style.height = "52px";
                ring.style.opacity = "0.8";
            });

            el.addEventListener("mouseleave", () => {
                cursor.style.width = "10px";
                cursor.style.height = "10px";

                ring.style.width = "38px";
                ring.style.height = "38px";
                ring.style.opacity = "0.5";
            });
        });
}


/* ── Navbar Scroll Effect ─────────────────────────────────── */
const nav = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 60);
    }
});


/* ── Hamburger / Mobile Menu ──────────────────────────────── */
const burger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        mobileMenu.classList.toggle("open");

        document.body.style.overflow =
            mobileMenu.classList.contains("open") ? "hidden" : "";
    });
}

function closeMobile() {
    if (burger && mobileMenu) {
        burger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
    }
}


/* ── Scroll Reveal Animation ───────────────────────────────── */
const reveals = document.querySelectorAll(".reveal");

const revealObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay =
                    (i % 4) * 0.1 + "s";

                entry.target.classList.add("visible");

                revealObs.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

reveals.forEach((el) => {
    revealObs.observe(el);
});


/* ── Lightbox Gallery ──────────────────────────────────────── */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

const galleryItems = [
    ...document.querySelectorAll(".gallery-item[data-src]")
];

let currentIdx = 0;


/* Open Gallery Image */
galleryItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
        currentIdx = idx;
        openLightbox(item.dataset.src);
    });
});


function openLightbox(src) {
    if (!lightbox || !lbImg) return;

    lbImg.src = src;

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";
}


/* Close Gallery */
function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");

    document.body.style.overflow = "";
}


if (lbClose) {
    lbClose.addEventListener("click", closeLightbox);
}


/* Close when clicking outside image */
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}


/* Previous Image */
if (lbPrev) {
    lbPrev.addEventListener("click", () => {
        currentIdx =
            (currentIdx - 1 + galleryItems.length) %
            galleryItems.length;

        lbImg.src = galleryItems[currentIdx].dataset.src;
    });
}


/* Next Image */
if (lbNext) {
    lbNext.addEventListener("click", () => {
        currentIdx =
            (currentIdx + 1) % galleryItems.length;

        lbImg.src = galleryItems[currentIdx].dataset.src;
    });
}


/* ── Keyboard Controls for Lightbox ────────────────────────── */
document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) {
        return;
    }

    if (e.key === "Escape") {
        closeLightbox();
    }

    if (e.key === "ArrowLeft" && lbPrev) {
        lbPrev.click();
    }

    if (e.key === "ArrowRight" && lbNext) {
        lbNext.click();
    }
});


/* ── Contact Form ──────────────────────────────────────────── */
function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector(".form-submit");
    const success = document.getElementById("formSuccess");

    if (!btn) return;

    btn.disabled = true;

    const buttonText = btn.querySelector("span");

    if (buttonText) {
        buttonText.textContent = "Sending...";
    }

    setTimeout(() => {
        if (success) {
            success.style.display = "block";
        }

        btn.style.display = "none";

        form.reset();
    }, 1200);
}


/* ── Counter Animation ─────────────────────────────────────── */
function animateCounter(el, target, duration = 2000) {
    let start = null;

    function step(timestamp) {
        if (!start) {
            start = timestamp;
        }

        const progress = Math.min(
            (timestamp - start) / duration,
            1
        );

        const eased =
            1 - Math.pow(1 - progress, 3);

        el.textContent =
            Math.floor(eased * target) + "+";

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target + "+";
        }
    }

    requestAnimationFrame(step);
}


/* ── Counter Observer ──────────────────────────────────────── */
const statNums = document.querySelectorAll(".stat-num");

/*
    Change these numbers according to your
    actual business information.
*/
const counterTargets = [25, 500, 300];

const counterObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                statNums.forEach((el, i) => {
                    if (counterTargets[i] !== undefined) {
                        animateCounter(
                            el,
                            counterTargets[i]
                        );
                    }
                });

                counterObs.disconnect();
            }
        });
    },
    {
        threshold: 0.5
    }
);

if (statNums.length) {
    counterObs.observe(statNums[0]);
}


/* ── Prevent Empty Social Links ────────────────────────────── */
document.querySelectorAll('.social-btn[href="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
    });
});


/* ── Page Loaded ───────────────────────────────────────────── */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});ss