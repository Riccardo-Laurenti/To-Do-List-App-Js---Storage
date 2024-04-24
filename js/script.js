// To-Do-List Web App - Developed by Riccardo Laurenti Web Developer
const writeIn = document.getElementById("input-write");
const buttonAdd = document.getElementById("add-task-button");
const domPrint = document.getElementById("print-task");
const noTaskMessage = document.getElementById("message-alert");

let vector = [];

const stringNoTask = `<p class="not-task">There are no tasks to show</p>`;


window.onload = function() {

    if (localStorage.getItem("tasks")) {
        vector = JSON.parse(localStorage.getItem("tasks"));

        vector.forEach(task => {
            displayTask(task);
        });

        if (!vector.length) noTaskMessage.innerHTML = stringNoTask;

    } else {
        noTaskMessage.innerHTML = stringNoTask;
    }
}


function displayTask(inputWrite) {

    const createTask = document.createElement("div");

    createTask.innerHTML = `
        <div id="todo-view">
            <div class="contain">
                <p>${inputWrite}</p>
                <div class="cest delete">
                    <i class="fa-solid fa-trash" ></i>
                </div>
            </div> 
        </div>
    `;

    domPrint.appendChild(createTask);



    const removeTask = createTask.querySelector(".delete");

    removeTask.addEventListener("click", function() {
        createTask.remove();
        const index = vector.indexOf(inputWrite); 
        if (index !== -1) {
            vector.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(vector)); 
        }  
        if (!vector.length) {
            noTaskMessage.innerHTML = stringNoTask;  
        }
    });
}


function createTask() {
    const inputWrite = writeIn.value.trim();   

    if (inputWrite === '') {
        alert("Error! You must enter a task");
        return;
    } else {
        vector.push(inputWrite);

        localStorage.setItem("tasks", JSON.stringify(vector));

        displayTask(inputWrite);

        writeIn.value = "";

        if (vector.length > 0) {
            noTaskMessage.innerHTML = ''; 
        }

        
    }
}


buttonAdd.addEventListener("click", function() {
    createTask();   
});


writeIn.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        createTask();
    }
});
