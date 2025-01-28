// DOM elements
const passcodeContainer = document.getElementById("passcode-container");
const mainContent = document.getElementById("main-content");
const passcodeInput = document.getElementById("passcode-input");
const submitPasscodeButton = document.getElementById("submit-passcode");
const errorMessage = document.getElementById("error-message");

// Utility function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Utility function to get a cookie
function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (cookiePair[0] === name) {
            return cookiePair[1];
        }
    }
    return null;
}

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
        const passcodeDoc = await db.collection("settings").doc("passcode").get();

        if (!passcodeDoc.exists) {
            throw new Error("Passcode not found in Firebase.");
        }

        const storedPasscode = passcodeDoc.data().value;

        // Check if the user input matches the stored passcode
        if (userInput === storedPasscode) {
            // Save the user-entered passcode in a cookie
            setCookie("userPasscode", userInput, 7); // Valid for 7 days

            // Grant access to the main content
            localStorage.setItem("isAuthenticated", "true");
            passcodeContainer.classList.remove("active");
            mainContent.classList.add("active");
            errorMessage.style.display = "none";
        } else {
            throw new Error("Incorrect passcode. Try again.");
        }
    } catch (error) {
        errorMessage.textContent = error.message || "An error occurred.";
        errorMessage.style.display = "block";
    }
});

// Auto-login if already authenticated
if (localStorage.getItem("isAuthenticated") === "true") {
    passcodeContainer.classList.remove("active");
    mainContent.classList.add("active");
}
