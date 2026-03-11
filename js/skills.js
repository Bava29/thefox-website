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

/* WORKFLOW SECTION */

const workflowSteps = document.querySelectorAll(".workflow-step");

function revealWorkflow() {

    workflowSteps.forEach(function (step) {

        const pos = step.getBoundingClientRect().top;
        const screen = window.innerHeight;

        if (pos < screen - 120) {
            step.classList.add("workflow-show");
        }

    });

}

window.addEventListener("scroll", revealWorkflow);

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