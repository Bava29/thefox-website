console.log("JS WORKING");

//STATS SECTION

const counters = document.querySelectorAll(".count");

window.addEventListener("scroll", () => {
    counters.forEach(counter => {
        const top = counter.getBoundingClientRect().top;
        const trigger = window.innerHeight * 0.85;

        if (top < trigger && !counter.classList.contains("done")) {
            let count = 0;
            const target = +counter.innerText;

            const update = () => {
                count += Math.ceil(target / 50);
                if (count >= target) {
                    counter.innerText = target;
                    counter.classList.add("done");
                } else {
                    counter.innerText = count;
                    requestAnimationFrame(update);
                }
            };

            update();
        }
    });
});

//STRENGTH SECTION

const strengthItems = document.querySelectorAll(
    ".slide-left, .slide-right, .slide-up"
);

window.addEventListener("scroll", () => {

    strengthItems.forEach(item => {

        const position = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 120) {
            item.classList.add("show");
        }

    });

});

//WORK SECTION

const workItems = document.querySelectorAll(".work-animate");

window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    workItems.forEach((item, index) => {
        const top = item.getBoundingClientRect().top;

        if (top < trigger) {
            setTimeout(() => {
                item.classList.add("active");
            }, index * 150);

        }
    });
});

/* CLIENTS CARD REVEAL */

const clientCards = document.querySelectorAll(".client-card");

function revealClients() {

    clientCards.forEach(function (card, index) {

        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardPosition < windowHeight - 100) {

            setTimeout(function () {
                card.classList.add("client-show");
            }, index * 200);

        }

    });

}

window.addEventListener("scroll", revealClients);

window.addEventListener("scroll", function () {

    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / height) * 100;

    document.querySelector(".scroll-progress").style.width = scrollPercent + "%";

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

