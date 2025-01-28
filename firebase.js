// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoi_pOuLAc26iRz--YNuVkogcfddOPcOM",
    authDomain: "jmovies-513c7.firebaseapp.com",
    projectId: "jmovies-513c7",
    storageBucket: "jmovies-513c7.appspot.com",
    messagingSenderId: "147745857096",
    appId: "1:147745857096:web:2a68928e0e62e9b9adc27d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
