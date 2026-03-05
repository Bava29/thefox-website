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