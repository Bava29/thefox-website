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

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

//RTL MODE

const rtlToggle = document.getElementById("rtl-toggle");

rtlToggle.addEventListener("click", () => {

    const html = document.documentElement;

    if (html.getAttribute("dir") === "rtl") {
        html.setAttribute("dir", "ltr");
        localStorage.setItem("direction", "ltr");
        location.reload();
    }
    else {
        html.setAttribute("dir", "rtl");
        localStorage.setItem("direction", "rtl");
        reverseText();
        reversePortfolioTitle();
    }

});


function reverseText() {

    const elements = document.querySelectorAll("h1, h2, h3, h4 ,p");

    elements.forEach(el => {

        if (el.querySelector("span")) return;

        const text = el.textContent.trim();
        if (!text) return;

        const words = el.textContent.trim().split(" ");
        el.textContent = words.reverse().join(" ");

    });

}
function reversePortfolioTitle() {

    const title = document.querySelector(".portfolio-white h1");
    if (!title) return;

    const span = title.querySelector("span");

    const firstWord = title.childNodes[0].textContent.trim();
    const secondWord = span.textContent.trim();

    title.childNodes[0].textContent = secondWord + " ";
    span.textContent = firstWord;

}

if (localStorage.getItem("direction") === "rtl") {

    document.documentElement.setAttribute("dir", "rtl");
    reverseText();
    reversePortfolioTitle();
}



//SCROLL PROGRESS

window.addEventListener("scroll", function () {

    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / height) * 100;

    document.querySelector(".scroll-progress").style.width = scrollPercent + "%";

});

//Menu Toggle

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".mobile-menu");

toggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});


//Dark Mode for responsive

const themeToggleMobile = document.getElementById("theme-toggle-mobile");

themeToggleMobile.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

//RTL mode for responsive

const rtlToggleMobile = document.getElementById("rtl-toggle-mobile");

rtlToggleMobile.addEventListener("click", () => {

    const html = document.documentElement;

    if (html.getAttribute("dir") === "rtl") {
        html.setAttribute("dir", "ltr");
        localStorage.setItem("direction", "ltr");
        location.reload();
    }
    else {
        html.setAttribute("dir", "rtl");
        localStorage.setItem("direction", "rtl");
        reverseText();
        updateHeroText();
    }

});

function updateHeroText() {

    const html = document.documentElement;

    const letsbe = document.querySelectorAll(".letsbe");
    const creative = document.querySelectorAll(".creative");
    const heroSub = document.querySelectorAll(".hero-sub");

    if (html.getAttribute("dir") === "rtl") {

        letsbe[0].textContent = "BE LET'S";
        creative[0].textContent = "CREATIVE";
        heroSub[0].textContent = "things best the make always I";

        letsbe[1].textContent = "MODERN";
        creative[1].textContent = "DESIGN";
        heroSub[1].textContent = "UI minimal and Clean";

        letsbe[2].textContent = "AWESOME";
        creative[2].textContent = "UX";
        heroSub[2].textContent = "experience user Better";

    } else {

        letsbe[0].textContent = "LET’S BE";
        creative[0].textContent = "CREATIVE";
        heroSub[0].textContent = "I always make the best things";

        letsbe[1].textContent = "MODERN";
        creative[1].textContent = "DESIGN";
        heroSub[1].textContent = "Clean and minimal UI";

        letsbe[2].textContent = "AWESOME";
        creative[2].textContent = "UX";
        heroSub[2].textContent = "Best user experience";

    }
}


function reverseText() {

    const elements = document.querySelectorAll("h1, h2, h3, h4, p");

    elements.forEach(el => {

        const words = el.textContent.trim().split(" ");
        el.textContent = words.reverse().join(" ");

    });

}

if (localStorage.getItem("direction") === "rtl") {

    document.documentElement.setAttribute("dir", "rtl");
    reverseText();

}

