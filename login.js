document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    // Helper function to get user data from localStorage
    function getUserData() {
        return JSON.parse(localStorage.getItem("users")) || {};
    }

    // Login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const users = getUserData();
        console.log(users); // Debugging line to check user data
        if (users[username] && users[username].password === password) {
            loginError.textContent = "";
            // set current user in localStorage for dashboard access
            localStorage.setItem("currentUser", username);
            window.location.href = "dashboard.html";
        } else {
            loginError.textContent = "Invalid username or password.";
        }
    });
});
