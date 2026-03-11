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