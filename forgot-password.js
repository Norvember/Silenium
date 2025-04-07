document.addEventListener("DOMContentLoaded", () => {
    const recoverPasswordForm = document.getElementById("recover-password-form");
    const recoverError = document.getElementById("recover-error");
    const recoverSuccess = document.getElementById("recover-success");

    // Helper function to get user data from localStorage
    function getUserData() {
        return JSON.parse(localStorage.getItem("users")) || {};
    }

    // Recover password form submission
    recoverPasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("recover-username").value;

        const users = getUserData();
        if (users[username]) {
            recoverError.textContent = "";
            recoverSuccess.textContent = `Your password is: ${users[username].password}`;
        } else {
            recoverSuccess.textContent = "";
            recoverError.textContent = "Username not found.";
        }
    });
});
