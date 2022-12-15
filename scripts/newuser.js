"use strict";
window.onload = () => {
    document.getElementById("addUser").onclick = () => {
        const actualName = document.getElementById("actualNameInput").value;
        const username = document.getElementById("userNameInput").value;
        const password = document.getElementById("passwordInput").value;
        const confirmpw = document.getElementById("confirmPassword").value;
        const anyEmptyValues = Boolean(actualName) && Boolean(username) && Boolean(password) && Boolean(confirmpw);
        const error = document.getElementById("errorMessage");
        const success = document.getElementById("successMessage");

        if (anyEmptyValues && (password === confirmpw)) {
            let newUser = {
                name: actualName,
                username: username,
                password: password
            }
            fetch("http://localhost:8083/api/users", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-type":
                        "application/json; charset=UTF-8"
                }
            }).then(response => {
                    success.innerHTML = "LET's GO!";
                    error.innerHTML = "";
            })
            .catch(error => {
                success.innerHTML = "";
                error.innerHTML = "Unexpected error";
            })
        } else {
            success.innerHTML = "";
            error.innerHTML = "Either you gave me empty values or passwords don't match. Not me, it's YOU"
        }
    }
}
