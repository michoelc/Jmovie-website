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
        const passcodeDoc = await db.collection("settings").doc("passcode").get();

        if (!passcodeDoc.exists) {
            throw new Error("Passcode not found.");
        }

        const storedPasscode = passcodeDoc.data().value;

        // Check if the input matches the stored passcode
        if (userInput === storedPasscode) {
            // Grant access to the main content
            localStorage.setItem("isAuthenticated", "true"); // Optional: Persist access
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

// Auto-login if already authenticated
if (localStorage.getItem("isAuthenticated") === "true") {
    passcodeContainer.classList.remove("active");
    mainContent.classList.add("active");
}