console.log("JS WORKING");

//HERO SECTION

const heroSlides = document.querySelectorAll(".hero-slide");
const nextHero = document.querySelector(".hero-next");
const prevHero = document.querySelector(".hero-prev");

let heroIndex = 0;

function showHeroSlide(index) {
    heroSlides[heroIndex].classList.remove("active");
    heroIndex = index;
    heroSlides[heroIndex].classList.add("active");
}

nextHero.addEventListener("click", () => {
    let next = heroIndex + 1;
    if (next >= heroSlides.length) next = 0;
    showHeroSlide(next);
});

prevHero.addEventListener("click", () => {
    let prev = heroIndex - 1;
    if (prev < 0) prev = heroSlides.length - 1;
    showHeroSlide(prev);
});

//ABOUT SECTION
const aboutSection = document.querySelector(".reveal-about");
const aboutProfile = document.querySelector(".reveal-profile");
const aboutText = document.querySelector(".reveal-text");
const aboutBtn = document.querySelector(".reveal-btn");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    if (aboutSection.getBoundingClientRect().top < trigger) {

        aboutSection.classList.add("active");

        setTimeout(() => {
            aboutProfile.classList.add("active");
        }, 200);

        setTimeout(() => {
            aboutText.classList.add("active");
        }, 400);

        setTimeout(() => {
            aboutBtn.classList.add("active");
        }, 600);
    }
});

// SERIVICES SECTION
const items = document.querySelectorAll(".services-item");

items.forEach(item => {
    item.addEventListener("click", () => {

        const isActive = item.classList.contains("active");
        items.forEach(i => {
            i.classList.remove("active");

            const icon = i.querySelector("i");
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        });

        if (isActive) return;
        item.classList.add("active");
        const icon = item.querySelector("i");
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");

    });
});

//PORTFOLIO SECTION
const portfolioItems = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.85;

    portfolioItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            setTimeout(() => {
                item.classList.add("active");
            }, index * 120);
        }
    });
});


//TESTIMONAL SECTION

let index = 0;

const slides = document.querySelectorAll(".testimonial-slide");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});


//FEATURES SECTION

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach((item) => {
        const top = item.getBoundingClientRect().top;

        if (top < triggerBottom) {
            item.classList.add("active");
        }
    });
});

//SKILLS SECTION

const skillBars = document.querySelectorAll(".skill-fill");

function animateSkills() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();

        if (rect.top < window.innerHeight - 50) {
            const value = bar.getAttribute("data-width");
            bar.style.width = value;
        }
    });
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

//PRICING SECTION

const pricingCards = document.querySelectorAll(".pricing-card");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.85;

    pricingCards.forEach((card) => {
        const top = card.getBoundingClientRect().top;

        if (top < triggerBottom) {
            card.classList.add("show");
        }
    });
});

//FEATURED SECTION
const revealItems = document.querySelectorAll(".reveal-left, .reveal-right");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealItems.forEach((item) => {
        const top = item.getBoundingClientRect().top;

        if (top < triggerBottom) {
            item.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const featuredSlides = document.querySelectorAll(".featured-slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".featured-next");
    const prevBtn = document.querySelector(".featured-prev");

    let current = 0;

    function changeSlide(index) {
        featuredSlides[current].classList.remove("active");
        dots[current].classList.remove("active");

        current = index;

        featuredSlides[current].classList.add("active");
        dots[current].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        let next = (current + 1) % featuredSlides.length;
        changeSlide(next);
    });

    prevBtn.addEventListener("click", () => {
        let prev = (current - 1 + featuredSlides.length) % featuredSlides.length;
        changeSlide(prev);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            changeSlide(i);
        });
    });

});
//FUNFACTS SECTION

const counters = document.querySelectorAll(".counter");
const factBoxes = document.querySelectorAll(".fact-box");

let started = false;

window.addEventListener("scroll", () => {
    const section = document.querySelector(".funfacts-section");
    const sectionTop = section.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (sectionTop < trigger && !started) {

        started = true;
        factBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add("active");
            }, index * 150);
        });

        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let count = 0;

            const speed = target / 100;

            const update = () => {
                count += speed;

                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            update();
        });
    }
});

// QUOTE SECTION ANIMATION 

const quote = document.querySelector(".quote-section");
const quoteContent = document.querySelector(".quote-content");
const quoteIcon = document.querySelector(".quote-icon");

window.addEventListener("scroll", () => {
    if (!quote) return;

    const trigger = window.innerHeight * 0.85;
    const top = quote.getBoundingClientRect().top;

    if (top < trigger) {
        quoteContent.classList.add("active");
        quoteIcon.classList.add("active");
    }
});

//NEWS SECTION 

const newsCards = document.querySelectorAll(".reveal-news");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    newsCards.forEach((card, index) => {
        const top = card.getBoundingClientRect().top;

        if (top < trigger) {
            setTimeout(() => {
                card.classList.add("active");
            }, index * 150);
        }
    });
});

//BLOG CTA SECTION

const blogCTA = document.querySelector(".reveal-cta");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    if (blogCTA.getBoundingClientRect().top < trigger) {
        blogCTA.classList.add("active");
    }
});

//SOCIAL STRIP SECTION

const social = document.querySelector(".reveal-social");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    if (social.getBoundingClientRect().top < trigger) {
        social.classList.add("active");
    }
});

//HIRE SECTION

const hireSection = document.querySelector(".reveal-hire");
const hireProfile = document.querySelector(".reveal-profile");
const hireDetails = document.querySelector(".reveal-details");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    if (hireSection.getBoundingClientRect().top < trigger) {
        hireSection.classList.add("active");

        setTimeout(() => {
            hireProfile.classList.add("active");
        }, 200);

        setTimeout(() => {
            hireDetails.classList.add("active");
        }, 400);
    }
});

//  CONTACT SECTION 

const contactSection = document.querySelector(".reveal-contact");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    if (contactSection.getBoundingClientRect().top < trigger) {
        contactSection.classList.add("active");
    }
});



function showAbout() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("about-page").style.display = "block";
    window.scrollTo(0, 0);
}

function goHome() {
    document.getElementById("about-page").style.display = "none";
    document.getElementById("home-page").style.display = "block";
    window.scrollTo(0, 0);
}

// TYPING EFFECT FUNCTION IN CONTACT SECTION 

function typeEffect(element, text, speed = 80) {
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.setAttribute("placeholder", text.substring(0, i + 1));
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

window.addEventListener("load", () => {

    const nameField = document.getElementById("contact-name");
    const emailField = document.getElementById("contact-email");
    const phoneField = document.getElementById("contact-phone");
    const subjectField = document.getElementById("contact-subject");

    if (nameField) {
        setTimeout(() => {
            typeEffect(nameField, "Tranmautritam");
        }, 100);
    }

    if (emailField) {
        setTimeout(() => {
            typeEffect(emailField, "tranmautritam@email.com");
        }, 100);
    }

    if (phoneField) {
        setTimeout(() => {
            typeEffect(phoneField, "+91 9876543210");
        }, 100);
    }

    if (subjectField) {
        setTimeout(() => {
            typeEffect(subjectField, "Project Discussion");
        }, 100);
    }

});

/* SCROLL UP BUTTON */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }

});

scrollBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* DARK MODE */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


/* RTL MODE */

const rtlBtn = document.getElementById("rtl-toggle");

rtlBtn.addEventListener("click", () => {

    if (document.documentElement.dir === "rtl") {
        document.documentElement.dir = "ltr";
    } else {
        document.documentElement.dir = "rtl";
    }

});

//HOME PAGE FOOTER LOGO //
const footerLogo = document.getElementById("footerHomeLogo");

if (footerLogo) {
    footerLogo.addEventListener("click", function (e) {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
