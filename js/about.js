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