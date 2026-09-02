const heading = document.getElementById("heading");
const input = document.getElementById("nameInput");
const button = document.getElementById("btn");

button.addEventListener("click",() => {
    button.addEventListener("click", () => {

    if (input.value === "") {
        heading.textContent = "Please enter your name!";
    } else {
        heading.textContent = `Hello, ${input.value}! 👋`;
        heading.classList.add("success");
    }

});

   heading.textContent = `Hello, ${input.value}!`; 
   heading.style.fontSize = "40px";
   heading.style.color = "green";


   button.addEventListener("click", () => {

    if (input.value === "") {
        heading.textContent = "Please enter your name!";
        heading.style.color = "red";
    } else {
        heading.textContent = `Hello, ${input.value}! 👋`;
        heading.style.color = "green";
    }

    heading.style.backgroundColor = "yellow";
heading.style.fontSize = "40px";
heading.style.fontWeight = "bold";
heading.style.textAlign = "center";
});
});