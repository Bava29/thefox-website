console.log("JS WORKING");

/* PORTFOLIO BANNER */

const bannerButton = document.querySelector(".portfolio-btn");

if (bannerButton) {
    bannerButton.addEventListener("click", function (event) {
        event.preventDefault();

        const digitalArea = document.querySelector(".digital-section");

        if (digitalArea) {
            digitalArea.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

/* DIGITAL SECTION SLIDE ANIMATION */

const digitalLeftContent = document.querySelector(".digital-left");
const digitalRightContent = document.querySelector(".digital-right");

function revealDigitalSection() {

    const digitalPosition = digitalLeftContent.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (digitalPosition < windowHeight - 120) {

        digitalLeftContent.classList.add("digital-show");
        digitalRightContent.classList.add("digital-show");

    }

}

window.addEventListener("scroll", revealDigitalSection);

/* SERVICE OFFER SECTION */

const serviceCards = document.querySelectorAll(".service-offer-card");

function revealServices() {

    serviceCards.forEach(function (card) {

        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardPosition < windowHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }

    });

}

window.addEventListener("scroll", revealServices);

/* VIEW PORTFOLIO BUTTON */

const viewPortfolioBtn = document.querySelector(".view-portfolio");

if (viewPortfolioBtn) {

    viewPortfolioBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const galleryTarget = document.querySelector("#portfolio-gallery");

        galleryTarget.scrollIntoView({
            behavior: "smooth"
        });

    });

}

/* PORTFOLIO GALLERY */

const galleryItems = document.querySelectorAll(".portfolio-gallery-item");

function revealPortfolioGallery() {

    galleryItems.forEach(function (item, index) {

        const itemTop = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (itemTop < screenHeight - 100) {

            setTimeout(function () {
                item.classList.add("portfolio-show");
            }, index * 10);

        }

    });

}

window.addEventListener("scroll", revealPortfolioGallery);

/* TESTIMONIAL SLIDE ANIMATION */

const testimonialCards = document.querySelectorAll(".testimonial-card");

testimonialCards.forEach(function (card, index) {

    if (index < 2) {
        card.classList.add("testimonial-left");
    } else {
        card.classList.add("testimonial-right");
    }

});

function revealTestimonials() {

    testimonialCards.forEach(function (card) {

        const cardTop = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (cardTop < screenHeight - 100) {
            card.classList.add("testimonial-show");
        }

    });

}

window.addEventListener("scroll", revealTestimonials);



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

//SCROLL PROGRESS

window.addEventListener("scroll", function () {

    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / height) * 100;

    document.querySelector(".scroll-progress").style.width = scrollPercent + "%";

});

