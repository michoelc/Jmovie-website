import { db } from './firebase.js'; // Import db from firebase.js

// Cookie functions
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}


function setCookie(name, value) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days expiration
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// DOM elements
const passcodeContainer = document.getElementById("passcode-container");
const mainContent = document.getElementById("main-content");
const passcodeInput = document.getElementById("passcode-input");
const submitPasscodeButton = document.getElementById("submit-passcode");
const errorMessage = document.getElementById("error-message");

// Passcode verification logic
submitPasscodeButton.addEventListener("click", async () => {
    const userInput = passcodeInput.value.trim();

    if (!userInput) {
        errorMessage.textContent = "Please enter a passcode.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        // Fetch the stored passcode from Firestore
        const passcodeDoc = await getDoc(doc(db, "settings", "passcode"));

        if (!passcodeDoc.exists()) {
            throw new Error("Passcode not found.");
        }

        const storedPasscode = passcodeDoc.data().value;

        // Check if the input matches the stored passcode
        if (userInput === storedPasscode) {
            // Grant access to the main content
            setCookie("password", storedPasscode); // Save passcode to cookie
            passcodeContainer.classList.remove("active");
            mainContent.classList.add("active");
        } else {
            throw new Error("Incorrect passcode. Try again.");
        }
    } catch (error) {
        errorMessage.textContent = error.message || "An error occurred.";
        errorMessage.style.display = "block";
    }
});

// Auto-login if passcode is found in cookie
const savedPassword = getCookie("password");

if (savedPassword) {
    // Verify that the saved passcode still matches Firestore
    const passcodeDoc = await getDoc(doc(db, "settings", "passcode"));

    if (passcodeDoc.exists() && passcodeDoc.data().value === savedPassword) {
        passcodeContainer.classList.remove("active");
        mainContent.classList.add("active");
    }
}
