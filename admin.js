import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ===============================
// CHECK ADMIN LOGIN
// ===============================

onAuthStateChanged(auth, (user) => {

    if (!user) {
        alert("Please login first.");
        window.location.href = "auth.html";
        return;
    }

    if (user.email !== "neutrixorg@gmail.com") {
        alert("Access Denied!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("adminEmail").textContent = user.email;

    loadBlogs();

});

// ===============================
// PUBLISH BLOG
// ===============================

const publishBtn = document.getElementById("publishBtn");

publishBtn.addEventListener("click", async () => {

    const title = document.getElementById("title").value.trim();

    const category = document.getElementById("category").value.trim();

    const image = document.getElementById("image").value.trim();

    const content = document.getElementById("content").value.trim();

    if (!title || !category || !image || !content) {

        alert("Please fill all fields.");

        return;

    }

    try {

        await addDoc(collection(db, "blogs"), {

            title,

            category,

            image,

            content,

            createdAt: new Date()

        });

        alert("Blog Published Successfully!");

        document.getElementById("title").value = "";
        document.getElementById("category").value = "";
        document.getElementById("image").value = "";
        document.getElementById("content").value = "";

        loadBlogs();

    } catch (error) {

        alert(error.message);

    }

});

// ===============================
// LOAD BLOGS
// ===============================

async function loadBlogs() {

    const blogList = document.getElementById("blogList");

    blogList.innerHTML = "";

    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    snapshot.forEach((blogDoc) => {

        const blog = blogDoc.data();

        blogList.innerHTML += `

        <div class="blog-card">

            <img src="${blog.image}" width="120">

            <h3>${blog.title}</h3>

            <p><strong>Category:</strong> ${blog.category}</p>

            <p>${blog.content.substring(0,120)}...</p>

            <button class="deleteBtn" data-id="${blogDoc.id}">
                Delete
            </button>

        </div>

        <hr>

        `;

    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {

        btn.addEventListener("click", deleteBlog);

    });

}

// ===============================
// DELETE BLOG
// ===============================

async function deleteBlog(e) {

    if (!confirm("Delete this blog?")) return;

    const id = e.target.dataset.id;

    await deleteDoc(doc(db, "blogs", id));

    alert("Blog Deleted");

    loadBlogs();

}

// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        window.location.href = "auth.html";

    });

}