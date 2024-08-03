let $ = document
let addElem = $.querySelector('.add')
let inputElem = $.querySelector('input')
let listTodo = $.querySelector('.jobs')
loadEventListeners()

function loadEventListeners(){
    addElem.addEventListener('click', adding)
    $.addEventListener('DOMContentLoaded', getTasks)
}

function adding(){
    // Adding
    let newJob = $.createElement('div')
    newJob.setAttribute('class', 'todo')
    newJob.innerHTML = inputElem.value

    let newTodoButton = $.createElement('div')
    newTodoButton.setAttribute('class', 'button__todo')

    let newButtonComplate = $.createElement('button')
    newButtonComplate.setAttribute('class', 'Complate')
    newButtonComplate.innerHTML = 'complate'

    let newButtonDelete = $.createElement('button')
    newButtonDelete.setAttribute('class', 'remove')
    newButtonDelete.innerHTML = 'Delete'

    newTodoButton.appendChild(newButtonComplate)
    newTodoButton.appendChild(newButtonDelete)

    newJob.appendChild(newTodoButton)

    listTodo.appendChild(newJob)

    //add to localstrage
    localStorageIteme(inputElem.value)

    //clear input
    inputElem.value = ''

    //add button handler
    $.querySelector('.remove').addEventListener('click', removeIteme)

    //add complate butto handler
    newButtonComplate.addEventListener('click', complateIteme)
}

//store items in localstrage
function localStorageIteme(task){
    let list

    if (localStorage.getItem('tasks') === null) {
        list = []
    } else {
        list = JSON.parse(localStorage.getItem('tasks'));
    }
    list.push(task)
    localStorage.setItem('tasks', JSON.stringify(list))
}

//craet iteme in localstrage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))      
    }
    tasks.forEach(function(task){
        let newJob = $.createElement('div')
        newJob.setAttribute('class', 'todo')
        newJob.innerHTML = task

        let newTodoButton = $.createElement('div')
        newTodoButton.setAttribute('class', 'button__todo')

        let newButtonComplate = $.createElement('button')
        newButtonComplate.setAttribute('class', 'Complate')
        newButtonComplate.innerHTML = 'complate'

        let newButtonDelete = $.createElement('button')
        newButtonDelete.setAttribute('class', 'remove')
        newButtonDelete.innerHTML = 'Delete'

        newTodoButton.appendChild(newButtonComplate)
        newTodoButton.appendChild(newButtonDelete)

        newJob.appendChild(newTodoButton)

        listTodo.appendChild(newJob)

        //add remove button handler
        newButtonDelete.addEventListener('click',removeIteme)

        //add complate butto handler
        newButtonComplate.addEventListener('click', complateIteme)
    })
}

// delete items from DOM
function removeIteme(event){
    event.target.parentElement.parentElement.remove()

    //delete items from localstrage
    removeItemeOfLs(event.target.parentElement.parentElement.firstChild)
}

//delete items from localstrage
function removeItemeOfLs(taskItem){
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function complateIteme(event){
    event.target.parentElement.parentElement.style.color = 'gray'
    event.target.parentElement.parentElement.style.textDecoration = 'line-through'
}