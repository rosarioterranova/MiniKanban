//---- Boards

const addBtns = document.querySelectorAll(".add-item-btn")
const saveItemBtn = document.querySelector(".save-item")
const lists = document.querySelectorAll(".list .custom-scroll")

//---- Modal

const modalTitle = document.querySelector("#addItemTitle")
const modalDescription = document.querySelector("#addItemDescription")

//---- Global Values

let tasks = {
    backlog: [],
    todo: [],
    inprogress: [],
    done: []
}

let listToAdd = ""

//---- On Click Events

const setListToAdd = listName =>{
    listToAdd = listName
}

const addItem = () =>{
    //Create Task
    switch(listToAdd){
        case "backlog": createTask(lists[0]); break;
        case "todo": createTask(lists[1]); break;
        case "inprogress": createTask(lists[2]); break; 
        case "done": createTask(lists[3]); break;
    }

    //Save task to data
    tasks[listToAdd].push({
        title: modalTitle.value,
        description: modalDescription.value
    })
    saveData()

    //Reset Modal Values
    modalTitle.value = ""
    modalDescription.value = ""
    listToAdd = ""
}

const createTask = (list, title=modalTitle.value, description=modalDescription.value) => {
    list.innerHTML += `
    <div class="border p-2 mb-2 task">
        <div class="d-flex my-2">
            <p class="task-title"><b>${title}</b></p>
            <button class="ml-auto remove-btn" onclick="removeTask('${title}')">-</button>
        </div>
        <p class="task-description">${description}</p>
    </div>
    `
}

//---- Loading Functions

const saveData = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const loadData = () => {
    if(localStorage.getItem("tasks")){
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    updateVisuals()
}

const updateVisuals = () => {

    lists.forEach(list => {
        list.innerHTML = ""
    });

    tasks.backlog.forEach(task => {
        createTask(lists[0], task.title, task.description)
    })
    tasks.todo.forEach(task => {
        createTask(lists[1], task.title, task.description)
    })
    tasks.inprogress.forEach(task => {
        createTask(lists[2], task.title, task.description)
    })
    tasks.done.forEach(task => {
        createTask(lists[3], task.title, task.description)
    })
}

const removeTask = (title) =>{
    for (const taskList of Object.values(tasks)) {
        for (const task of taskList) {
            if(task.title == title){
                taskList.splice(taskList.indexOf(task),1)
            }
        }
    }
    updateVisuals()
    saveData()
}

loadData()