const loadButton = document.getElementById("loadUsers");
const userList = document.getElementById("userList");

loadButton.addEventListener("click", async () => {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();

        userList.innerHTML = "";

        users.forEach((user) => {

            const div = document.createElement("div");

            div.classList.add("user");

            div.innerHTML = `
                <h2>${user.name}</h2>
                <p>Email: ${user.email}</p>
                <p>City: ${user.address.city}</p>
            `;

            userList.appendChild(div);
        });

    } catch (error) {

        userList.textContent = "Something went wrong!";

        console.log(error);
    }

});