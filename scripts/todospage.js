"use strict";

window.onload = () => {
    const userDropdown = document.getElementById("listOfUsers");
    populateDropdown(userDropdown);
    userDropdown.onchange = displayTasksByUser;
}
/*once the window loads 
    access the dropdown -> fetch the user data -> Populate the dropdown with the data returned*/
function populateDropdown(dropdown) {
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(allUsers => {
            for (let user of allUsers) {
                let option = new Option(user["name"], user["id"]);
                dropdown.appendChild(option);
            }
        });
}
function displayTasksByUser() {
    //the selected user's value is their unique id; this id of the user's gets us THEIR unique tasks 
    const userSelected = document.getElementById("listOfUsers").value;
    const parentTable = document.querySelector("table");
    const tableBody = document.getElementById("displayTodoTasks");
    const message = document.getElementById("message");
    tableBody.innerHTML = "";

    fetch(`http://localhost:8083/api/todos/byuser/${userSelected}`).then(response => response.json()).then(anyTasks => {
        if ((anyTasks.length < 1) || anyTasks === null) {
            message.innerHTML = "Nothing";
            parentTable.style.display = "none";
        }
        else {
            for (let task of anyTasks) {
                let row = tableBody.insertRow(-1);
                for (let property in task) {
                    switch (property) {
                        //as long as its one of these properties, add it to the cell 
                        case "description":
                        case "deadline":
                        let cell = row.insertCell(-1);
                        cell.innerHTML = task[property];
                        break;
                    }
                }
                let anchorCell = row.insertCell(-1);
                let anchor = document.createElement("a");
                anchor.href = `todo_details.html?toDoid=${task.id}`;
                anchor.text = "See Details";
                anchorCell.appendChild(anchor);
            }
            parentTable.style.display = "block";
            message.innerHTML = "";
        }

    });
}