console.log("JS WORKING");

/* CONTACT CARD ANIMATION */

const contactImage = document.querySelector(".contact-left");
const contactForm = document.querySelector(".contact-right");

document.addEventListener("DOMContentLoaded", () => {

    if (contactImage && contactForm) {

        setTimeout(() => {
            contactImage.classList.add("contact-show");
            contactForm.classList.add("contact-show");
        }, 50);

    }

});
/* CONTACT INFO REVEAL */

const infoBoxes = document.querySelectorAll(".contact-info-box");

function revealContactInfo() {

    infoBoxes.forEach(function (box, index) {

        const boxTop = box.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (boxTop < windowHeight - 120) {

            setTimeout(function () {
                box.classList.add("contact-info-show");
            }, index * 200);

        }

    });

}

window.addEventListener("scroll", revealContactInfo);


/* CONTACT DETAILS REVEAL */

const detailsLeft = document.querySelector(".contact-details-left");
const detailsMap = document.querySelector(".contact-map");

function revealContactDetails() {

    const position = detailsLeft.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 120) {

        detailsLeft.classList.add("contact-details-show");
        detailsMap.classList.add("contact-details-show");

    }

}

window.addEventListener("scroll", revealContactDetails);

/* MAP ZOOM EFFECT */

const contactMap = document.querySelector(".contact-map iframe");

contactMap.addEventListener("mouseenter", function () {
    contactMap.style.transform = "scale(1.03)";
    contactMap.style.transition = "0.4s";
});

contactMap.addEventListener("mouseleave", function () {
    contactMap.style.transform = "scale(1)";
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
    }

});


function reverseText() {

    const elements = document.querySelectorAll("h1, h2, h3, h4 ,p");

    elements.forEach(el => {

        const words = el.textContent.trim().split(" ");
        el.textContent = words.reverse().join(" ");

    });

}

if (localStorage.getItem("direction") === "rtl") {

    document.documentElement.setAttribute("dir", "rtl");
    reverseText();

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
    }

});


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

