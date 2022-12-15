"use strict";
window.onload = () => {
    const userDropdown = document.getElementById("listOfUsernames");
    const categoriesDropdown = document.getElementById("listOfCategories");
    const addTaskBtn = document.getElementById("addTaskButton");

    populateUserDropdown(userDropdown);
    populateCategoryDropdown(categoriesDropdown);
    addTaskBtn.onclick = addTask;
}
function populateUserDropdown(dropdown) {
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(allUsers => {
            for (let user of allUsers) {
                let option = new Option(user["name"], user["id"]);
                dropdown.appendChild(option);
            }
        });
}
function populateCategoryDropdown(dropdown) {
    fetch("http://localhost:8083/api/categories")
        .then(response => response.json())
        .then(allCategories => {
            for (let category of allCategories) {
                let option = new Option(category["name"], category["id"]);
                dropdown.appendChild(option);
            }
        });
}
function addTask() {
    const userSelected = document.getElementById("listOfUsernames").value;
    const categorySelected = document.getElementById("listOfCategories").value;
    const prioritySelected = document.getElementById("priorityLevels").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const anyEmptyValues = Boolean(categorySelected) && Boolean(prioritySelected) && Boolean(description) && Boolean(deadline) && Boolean(userSelected);
    const message = document.getElementById("message");
    if (anyEmptyValues) {

        let newTask = {
            userid: userSelected,
            category: categorySelected,
            description: description,
            deadline: new Date(deadline),
            priority: prioritySelected
        }
        fetch("http://localhost:8083/api/todos", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(results => {
                message.className = "display-6 m-4 text-success";
                message.innerHTML = "We took a W";
            })
            .catch(error => {
                message.className = "display-6 m-4 text-danger";
                message.innerHTML = "Unexpected error";
            });
    } else {
        message.innerHTML = "Fill in ALL the boxes please";
    }
}