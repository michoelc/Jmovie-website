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
    console.log(`Set cookie: ${name}=${value}`);
}

// Utility function to get a cookie
function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (cookiePair[0] === name) {
            console.log(`Found cookie: ${name}=${cookiePair[1]}`);
            return cookiePair[1];
        }
    }
    console.log(`Cookie not found: ${name}`);
    return null;
}

// Set the correct passcode as a cookie (this should only be done once, e.g., by an admin)
const correctPasscode = "moshiach"; // Change this to your actual passcode
if (!getCookie("passcode")) {
    setCookie("passcode", correctPasscode, 7); // Valid for 7 days
}

// Passcode verification logic
submitPasscodeButton.addEventListener("click", () => {
    const userInput = passcodeInput.value.trim();
    const storedPasscode = getCookie("passcode");

    if (!userInput) {
        errorMessage.textContent = "Please enter a passcode.";
        errorMessage.style.display = "block";
        return;
    }

    if (userInput === storedPasscode) {
        // Grant access to the main content
        localStorage.setItem("isAuthenticated", "true"); // Optional: Persist access
        passcodeContainer.classList.remove("active");
        mainContent.classList.add("active");
        console.log("Access granted!");
    } else {
        errorMessage.textContent = "Incorrect passcode. Try again.";
        errorMessage.style.display = "block";
        console.log("Incorrect passcode entered.");
    }
});

// Auto-login if already authenticated
if (localStorage.getItem("isAuthenticated") === "true") {
    passcodeContainer.classList.remove("active");
    mainContent.classList.add("active");
    console.log("Auto-login successful!");
}
