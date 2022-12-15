"use strict";
window.onload = () => {
    displayData();
    document.getElementById("completedTask").onclick = markTaskComplete;
}
function displayData(){
    const urlParameters = new URLSearchParams(location.search);
    let id = -1;
    if(urlParameters.has("toDoid")){
        id = urlParameters.get("toDoid");
        fetch(`http://localhost:8083/api/todos/${id}`).then(response => response.json())
        .then(task => {
            document.getElementById("displayCategory").value = task.category;
            document.getElementById("displayDescription").value = task.description;
            document.getElementById("displayDeadline").value = task.deadline;
            document.getElementById("displayPriority").value = task.priority;
            if(task.completed){
                document.getElementById("displayCompleted").value = 'Yes';
            } else {
                document.getElementById("displayCompleted").value = "No";
            }
            
        });
    }
}
function markTaskComplete(){
    const confirm = document.getElementById("confirm");
    const urlParameters = new URLSearchParams(location.search);
    const id = urlParameters.get("toDoid");
    fetch(`http://localhost:8083/api/todos/${id}`, {
        method: "PUT"
    }).then(response => response.json())
    .then(results =>{
        confirm.classList.add("text-success");
        confirm.classList.remove("text-warning"); 
        document.getElementById("confirm").innerHTML = "YOU STAY CONSISTENT";
    })
    .catch(err => {
        confirm.classList.add("text-warning");
        confirm.classList.remove("text-success");
        confirm.innerHTML = "Something happend, I don't know what but all I know it wasn't my fault"
    });
}