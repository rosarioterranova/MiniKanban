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
let draggedItem = ""
let draggedItemTitle = ""
let currentListDrop = ""
let listIndexTarget = ""

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
    <div class="border p-2 mb-2 task" draggable="true" ondragstart="drag(event)">
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

//---- Drag and Drop Events

const drag = event =>{
    draggedItem = event.target.outerHTML
    draggedItemTitle = event.target.querySelector(".task-title").textContent
}

const allowDrop = e =>{
    e.preventDefault();
}

const dragEnter = listIndex =>{
    lists[listIndex].classList.add("over")
    currentListDrop = lists[listIndex]
    listIndexTarget = listIndex
}

const drop = e =>{
    e.preventDefault();

    //Remove drop effect
    lists.forEach(list => list.classList.remove("over"))

    //Add task to column
    currentListDrop.innerHTML = draggedItem
    draggedItem.innerHTML=""

    //Move tasks to data structure
    for (const taskList of Object.values(tasks)) {
        for (const task of taskList) {
            if(task.title == draggedItemTitle){
                taskList.splice(taskList.indexOf(task),1)
                switch(listIndexTarget){
                    case 0: tasks.backlog.push(task); break;
                    case 1: tasks.todo.push(task); break;
                    case 2: tasks.inprogress.push(task); break;
                    case 3: tasks.done.push(task); break;
                }
            }
        }
    }

    updateVisuals()
    saveData()
}

loadData()