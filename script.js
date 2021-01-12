//Boards
const addBtns = document.querySelectorAll(".add-item-btn")
const saveItemBtn = document.querySelector(".save-item")
const lists = document.querySelectorAll(".list .custom-scroll")

//Modal
const addItemTitle = document.querySelector("#addItemTitle")
const addItemDescription = document.querySelector("#addItemDescription")

let listToAdd = ""

const setListToAdd = listName =>{
    listToAdd = listName
}

const createTask = (title, description) => `
<div class="border p-2 mb-2 task">
    <div class="d-flex">
        <p class="task-title">${title}</p>
        <p class="ml-auto remove-btn">-</p>
    </div>
    <p class="task-description">${description}</p>
</div>
`

const addItem = () =>{
    switch(listToAdd){
        case "Backlog":
            lists[0].innerHTML += createTask(addItemTitle.value, addItemDescription.value)
            break;
        case "ToDo":
            lists[1].innerHTML += createTask(addItemTitle.value, addItemDescription.value)
            break;
        case "InProgress":
            lists[2].innerHTML += createTask(addItemTitle.value, addItemDescription.value)
            break;
        case "Done":
            lists[3].innerHTML += createTask(addItemTitle.value, addItemDescription.value)
            break;
    }

    //Reset Modal Values
    addItemTitle.value = ""
    addItemDescription.value = ""
}
