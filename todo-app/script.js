const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask() {

    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.textContent = taskText;

    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        const newTask = prompt("Edit your task:", taskText);

        if (newTask !== null && newTask !== "") {
            li.firstChild.textContent = newTask;
            saveTasks();
        }

    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        li.remove();
        saveTasks();

    });

    // COMPLETE TASK
    li.addEventListener("click", function () {

        li.classList.toggle("completed");
        saveTasks();

    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";

    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}

addBtn.addEventListener("click", function () {
    addTask();
});

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

loadTasks();