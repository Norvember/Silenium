document.addEventListener("DOMContentLoaded", () => {
    const addItemForm = document.getElementById("add-item-form");
    const itemList = document.getElementById("item-list");

    let currentUser = localStorage.getItem("currentUser");
    console.log(currentUser); // Debugging line to check current user

    // Helper function to get user data from localStorage
    function getUserData() {
        return JSON.parse(localStorage.getItem("users")) || {};
    }

    // Helper function to save user data to localStorage
    function saveUserData(data) {
        localStorage.setItem("users", JSON.stringify(data));
    }

    // Update item list
    function updateItemList() {
        const users = getUserData();
        const items = users[currentUser]?.items || [];
        itemList.innerHTML = items
            .map((item, index) => `<li>${item} <button class="delete-item" data-index="${index}">Remove</button></li>`)
            .join("");

        // Attach event listeners to delete buttons
        document.querySelectorAll(".delete-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                removeItem(index);
            });
        });
    }

    // Add item form submission
    addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = document.getElementById("item-name").value;

        if (currentUser) {
            const users = getUserData();
            users[currentUser].items.push(itemName);
            saveUserData(users);
            updateItemList();
        }
    });

    // Remove item from the list
    function removeItem(index) {
        const users = getUserData();
        if (currentUser && users[currentUser]?.items) {
            users[currentUser].items.splice(index, 1);
            saveUserData(users);
            updateItemList();
        }
    }

    // Initialize item list
    if (currentUser) {
        updateItemList();
    } else {
        window.location.href = "index.html";
    }
});
