alert("auth.js loaded");
import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Login = true
// Register = false
let login = true;

// ===========================
// SWITCH LOGIN / REGISTER
// ===========================

window.toggleForm = function () {

    login = !login;

    document.getElementById("formTitle").textContent =
        login ? "Login" : "Register";

    document.getElementById("name").style.display =
        login ? "none" : "block";

};

// ===========================
// LOGIN / REGISTER
// ===========================

window.handleAuth = async function () {

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    if (!email || !password) {

        alert("Please fill all required fields.");

        return;

    }

    try {

        // ================= LOGIN =================

        if (login) {

            const userCredential =
                await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            localStorage.setItem("userName", user.displayName || user.email.split("@")[0]);

            localStorage.setItem("userEmail", user.email);

            alert("Login Successful!");

            window.location.href = "index.html";

        }

        // ================= REGISTER =================

        else {

            if (!name) {

                alert("Please enter your name.");

                return;

            }

            const userCredential =
                await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, {

                displayName: name

            });

            alert("Registration Successful!");

            login = true;

            document.getElementById("formTitle").textContent = "Login";

            document.getElementById("name").style.display = "none";

        }

    }

    catch (error) {

        switch (error.code) {

            case "auth/email-already-in-use":
                alert("Email already registered.");
                break;

            case "auth/invalid-email":
                alert("Invalid email address.");
                break;

            case "auth/weak-password":
                alert("Password must be at least 6 characters.");
                break;

            case "auth/invalid-credential":
                alert("Incorrect email or password.");
                break;

            default:
                alert(error.message);

        }

    }

};
