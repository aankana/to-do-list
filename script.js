const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

function addTask(){
    if(inputBox.value === ''){
        alert("Enter Something")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = `
        <span class="task-text">${inputBox.value}</span>
        <img class="edit-button" src="./assets/edit-icon.png" alt="Edit">
        <img class="delete-button" src="./assets/delete-icon.png" alt="Edit">
        `;
        listContainer.appendChild(li)
        saveData()
    }
    inputBox.value = '';
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.classList.contains("delete-button")){
        e.target.parentElement.remove();
        saveData()
    }
    else if(e.target.classList.contains("edit-button")){
        editTask(e.target);
    }
}, false)

function editTask(editButton){
    let li = editButton.parentElement;
    let taskTextElement = li.querySelector(".task-text")
    let oldText = taskTextElement.innerText

    let inputField = document.createElement("input")
    inputField.type = "text"
    inputField.value = oldText
    inputField.classList.add("edit-input");

    li.replaceChild(inputField, taskTextElement)

    inputField.focus()

    inputField.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            saveEditedTask(inputField, taskTextElement, li)
        }
    })
}

function saveEditedTask(inputField, taskTextElement, li){
    let newText = inputField.value.trim()
    if(newText !== ""){
        taskTextElement.innerText = newText;
    }
    li.replaceChild(taskTextElement, inputField)
    saveData()
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showList()