let $ = document
let addElem = $.querySelector('.add')
let deleteElem = $.querySelector('.delete')
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
    if (localStorage.getItem('tasks') === null) {
        list = []
    } else {
        list = JSON.parse(localStorage.getItem('tasks'));
    }
    let obg = {
        id : list.length +1,
        name : task,
        complate : false
    }
    list.push(obg)
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
        newJob.innerHTML = task.name

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
        if (taskItem.textContent === task.name) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//set complate tasks of DOM
function complateIteme(event){
    event.target.parentElement.parentElement.classList.add('Complate__job')
    // complateItemeOfLs(JSON.parse(localStorage.getItem('tasks')))
}

//set complate tasks of LS
function complateItemeOfLs(taskName){
    console.log(taskName)
}

//deiete all iteme from DOM & LS
deleteElem.addEventListener('click', removing)
function removing(){
    listTodo.innerHTML = ''
    localStorage.removeItem('tasks')
}

