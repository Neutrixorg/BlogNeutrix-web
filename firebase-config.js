import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdu3tJ5nobRx12W3SCm_IsrWqPd3q_6q8",
  authDomain: "blogneutrix.firebaseapp.com",
  projectId: "blogneutrix",
  storageBucket: "blogneutrix.firebasestorage.app",
  messagingSenderId: "936720452759",
  appId: "1:936720452759:web:b2c1195ce9da34e4e46dd2",
  measurementId: "G-G56Y1WVDP7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
