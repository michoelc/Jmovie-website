// Import Firestore from firebase.js
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
    const passcodeRef = doc(db, "settings", "passcode");
    const passcodeDoc = await getDoc(passcodeRef);

    if (!passcodeDoc.exists()) {
      throw new Error("Passcode not found.");
    }

    const storedPasscode = passcodeDoc.data().value;

    if (userInput === storedPasscode) {
      localStorage.setItem("isAuthenticated", "true");
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
