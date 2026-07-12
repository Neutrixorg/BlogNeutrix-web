/*=========================================
        BLOG SEARCH
=========================================*/

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            const text = card.querySelector("p").textContent.toLowerCase();

            if (title.includes(value) || text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/*=========================================
        DARK MODE
=========================================*/

const darkBtn = document.getElementById("darkMode");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    if (darkBtn) {

        darkBtn.innerHTML = "☀️";

    }

}

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            darkBtn.innerHTML = "☀️";

        } else {

            localStorage.setItem("theme", "light");

            darkBtn.innerHTML = "🌙";

        }

    });

}

/*=========================================
      SCROLL TO TOP
=========================================*/

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================
      HEADER SHADOW
=========================================*/

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";

        } else {

            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.1)";

        }

    });

}

/*=========================================
      SMOOTH NAVIGATION
=========================================*/

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

        const target = this.getAttribute("href");

        if (target.startsWith("#")) {

            e.preventDefault();

            document.querySelector(target).scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*=========================================
      NEWSLETTER
=========================================*/

const newsletter = document.querySelector(".newsletter form");

if (newsletter) {

    newsletter.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.querySelector("input").value.trim();

        if (!email) {

            alert("Please enter your email.");

            return;

        }

        alert("🎉 Thanks for subscribing!");

        this.reset();

    });

}

/*=========================================
      CONTACT FORM
=========================================*/

const contactForm = document.querySelector(".contact form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("✅ Message sent successfully!");

        this.reset();

    });

}

/*=========================================
      PAGE LOADER
=========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});
const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        // Highlight selected category
        categoryCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        // Scroll to Latest Articles
        document.querySelector(".blogs").scrollIntoView({
            behavior: "smooth"
        });

        // Load selected category blogs
        loadBlogs(category);

    });

});
const catBox = document.getElementById("catBox");

const leftBtn = document.getElementById("leftBtn");

const rightBtn = document.getElementById("rightBtn");

leftBtn.addEventListener("click", () => {

    catBox.scrollBy({

        left: -250,

        behavior: "smooth"

    });

});

rightBtn.addEventListener("click", () => {

    catBox.scrollBy({

        left: 250,

        behavior: "smooth"

    });

});