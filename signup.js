document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const registerError = document.getElementById("register-error");

    // Helper function to get user data from localStorage
    function getUserData() {
        return JSON.parse(localStorage.getItem("users")) || {};
    }

    // Helper function to save user data to localStorage
    function saveUserData(data) {
        localStorage.setItem("users", JSON.stringify(data));
    }

    // Enhanced validation for username and password
    function validateUsername(username) {
        return /^[a-zA-Z0-9_]{3,15}$/.test(username);
    }

    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/.test(password);
    }

    // Register form submission
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        if (!validateUsername(username)) {
            registerError.textContent = "Username must be 3-15 characters and contain only letters, numbers, or underscores.";
            return;
        }

        // if (!validatePassword(password)) {
        //     registerError.textContent = "Password must be at least 8 characters, include a number, a lowercase, and an uppercase letter.";
        //     return;
        // }

        const users = getUserData();
        if (users[username]) {
            registerError.textContent = "Username already exists.";
        } else {
            users[username] = { password, items: [] };
            saveUserData(users);
            registerError.textContent = "Registration successful!";
            window.location.href = "index.html"; // Redirect to login page after successful registration
        }
    });
});
