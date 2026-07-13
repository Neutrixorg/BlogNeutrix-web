import { db } from "./firebase-config.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Pagination Configuration
const blogsPerPage = 6;
let currentPage = 1;
let allBlogs = [];

window.loadBlogs = async function(category = "All") {
    const blogContainer = document.getElementById("blogs");
    if (!blogContainer) return;

    blogContainer.innerHTML = "<p>Loading blogs...</p>";

    try {
        const snapshot = await getDocs(collection(db, "blogs"));
        
        // Reset the array for the new category filter
        allBlogs = [];

        snapshot.forEach((doc) => {
            const blog = doc.data();
            if (category === "All" || blog.category === category) {
                allBlogs.push(blog);
            }
        });

        // Reset to page 1 whenever we load or switch categories
        currentPage = 1; 
        displayBlogs();

    } catch (error) {
        console.error("Error loading blogs:", error);
        blogContainer.innerHTML = "<p>Error loading blogs. Please try again later.</p>";
    }
}

function displayBlogs() {
    const blogContainer = document.getElementById("blogs");
    if (!blogContainer) return;

    blogContainer.innerHTML = "";

    if (allBlogs.length === 0) {
        blogContainer.innerHTML = "<p>No blogs found in this category.</p>";
        document.getElementById("pageNumbers").innerHTML = "";
        document.getElementById("prevBtn").disabled = true;
        document.getElementById("nextBtn").disabled = true;
        return;
    }

    // Calculate start and end indexes for slicing the current page
    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const blogsToDisplay = allBlogs.slice(start, end);

    blogsToDisplay.forEach((blog) => {
        blogContainer.innerHTML += `
        <div class="card">
            <img src="${blog.image}" alt="${blog.title}">
            <div class="content">
                <span class="tag">${blog.category}</span>
                <h3>${blog.title}</h3>
                <p>${blog.content.substring(0, 140)}...</p>
                <a href="blog-details.html"
                   class="readMoreBtn"
                   data-title="${blog.title}"
                   data-category="${blog.category}"
                   data-image="${blog.image}"
                   data-content="${encodeURIComponent(blog.content)}">
                    Read More →
                </a>
            </div>
        </div>
        `;
    });

    // Re-attach details events since we just injected new DOM nodes
    if (typeof addReadMoreEvents === "function") {
        addReadMoreEvents();
    }
    
    // Refresh pagination buttons
    createPagination();
}

function createPagination() {
    const pageNumbers = document.getElementById("pageNumbers");
    if (!pageNumbers) return;

    pageNumbers.innerHTML = "";
    const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = "page-btn";
        btn.innerText = i;

        if (i === currentPage) {
            btn.classList.add("active");
        }

        btn.onclick = () => {
            currentPage = i;
            displayBlogs();
            scrollToBlogs();
        };

        pageNumbers.appendChild(btn);
    }

    // Sync state of Next & Previous buttons
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages || totalPages === 0;
}

// Setup Next / Prev Button Click Handlers
document.getElementById("nextBtn").onclick = () => {
    const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayBlogs();
        scrollToBlogs();
    }
};

document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        displayBlogs();
        scrollToBlogs();
    }
};

// Smooth scroll helper
function scrollToBlogs() {
    const target = document.getElementById("blogs");
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth"
        });
    }
}

// Initial Kickoff
loadBlogs();
