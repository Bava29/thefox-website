console.log("JS WORKING");

/* PROJECT OVERVIEW REVEAL */

const overviewSections = document.querySelectorAll(".overview-item");

function revealOverview() {

    overviewSections.forEach(function (item) {

        const itemPosition = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (itemPosition < screenHeight - 120) {
            item.classList.add("overview-show");
        }

    });

}

window.addEventListener("scroll", revealOverview);

/* PROJECT GALLERY HOVER */

const projectImages = document.querySelectorAll(".gallery-grid img");

projectImages.forEach(function (img) {

    img.addEventListener("mouseenter", function () {
        img.style.transform = "scale(1.03)";
        img.style.transition = "0.4s";
    });

    img.addEventListener("mouseleave", function () {
        img.style.transform = "scale(1)";
    });

});

/* BACK BUTTON SCROLL */

const backButtons = document.querySelectorAll(".back-btn");

backButtons.forEach(function (btn) {

    btn.addEventListener("click", function (e) {

        e.preventDefault();

        window.location.href = "portfolio.html#portfolio-gallery";

    });

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

