console.log("JS WORKING");

/* CORE SKILLS SECTION */

const skillBars = document.querySelectorAll(".skills-progress-level");

function animateSkills() {

    skillBars.forEach(function (bar) {

        const barPosition = bar.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (barPosition < screenHeight - 100) {

            const width = bar.getAttribute("data-width");
            bar.style.width = width;

        }

    });

}

window.addEventListener("scroll", animateSkills);

/* TOOLS CARD SECTION */

const toolCards = document.querySelectorAll(".tool-card");

function revealTools() {

    toolCards.forEach(function (card, index) {

        const cardTop = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (cardTop < screenHeight - 120) {

            setTimeout(function () {
                card.classList.add("tool-show");
            }, index * 80);

        }

    });

}

window.addEventListener("scroll", revealTools);


/* CREATIVE SKILLS SECTION */

const creativeCards = document.querySelectorAll(".creative-card");

function revealCreative() {

    creativeCards.forEach(function (card) {

        const pos = card.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if (pos < screen - 120) {
            card.classList.add("creative-show");
        }

    });

}

window.addEventListener("scroll", revealCreative);

/* TIMELINE SECTION */

const timelineItems = document.querySelectorAll(".timeline-item");

function revealTimeline() {

    timelineItems.forEach(function (item) {

        const pos = item.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if (pos < screen - 120) {
            item.classList.add("timeline-show");
        }

    });

}

window.addEventListener("scroll", revealTimeline);

const cards = document.querySelectorAll(".tool-card, .creative-card");

const revealCards = () => {
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            card.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealCards);

/* VISUAL SECTION */

const visualLeft = document.querySelector(".visual-left");
const visualRight = document.querySelector(".visual-right");

function revealVisual() {

    const pos = visualLeft.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (pos < screen - 120) {

        visualLeft.style.transform = "translateX(0)";
        visualRight.style.transform = "translateX(0)";
        visualLeft.style.opacity = "1";
        visualRight.style.opacity = "1";

    }

}

window.addEventListener("scroll", revealVisual);

const items = document.querySelectorAll(
    ".workflow-step, .visual-left, .visual-right"
);

const reveal = () => {
    items.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
};

window.addEventListener("scroll", reveal);

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

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}


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

