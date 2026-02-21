console.log("JS WORKING");

// SERIVICES SECTION
const items = document.querySelectorAll(".services-item");

items.forEach(item => {
    item.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // Close all
        items.forEach(i => {
            i.classList.remove("active");

            const icon = i.querySelector("i");
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        });

        // If already open → close only
        if (isActive) return;

        // Open clicked
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
            }, index * 120); // stagger effect
        }
    });
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