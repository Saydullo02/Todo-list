
//HTML elements
const elTodoForm = document.querySelector(".todo__form");
const elTodoFormInput = document.querySelector(".todo-input");
const elTodoFormBtn = document.querySelector(".todo-btn");
const elTodoList = document.querySelector(".todo__list");
const elTodoControl = document.querySelector(".todo__control");
const elTodoAllBtn = document.querySelector(".all-btn");
const elTodoAllCount = document.querySelector(".all-btn");
const elTodoCompletedBtn = document.querySelector(".completed-btn");
const elTodoCompletedCount = document.querySelector(".completed-count");
const elTodoUncompletedBtn = document.querySelector(".uncompleted-btn");
const elTodoUncompletedCount = document.querySelector(".uncompleted-count");
const elTodoTemplate = document.querySelector("#todo__template").content;



let storage = window.localStorage
let localArray = JSON.parse(storage.getItem("newArray"));
let localCounter = JSON.parse(storage.getItem("counter"));


let todoArray = localArray || []
let counter = localCounter || 1

elTodoForm.addEventListener("submit", function (event) {
    event.preventDefault()
    
    let todoInput = elTodoFormInput.value.trim();
    
    elTodoFormInput.value = null;
    
    if (todoInput) {
        
        let newObject = {
            
            id: counter++,
            todo: todoInput,
            isCompleted: false
        }
        
        storage.setItem("counter", JSON.stringify(counter));
        todoArray.unshift(newObject);
        
    }
    storage.setItem("newArray", JSON.stringify(todoArray));
    renderTodos(todoArray, elTodoList);
    todoCalculate(todoArray)
    
})


function renderTodos(array, wrapper) {
    
    wrapper.innerHTML = null;
    
    let todoFragment = document.createDocumentFragment();
    
    
    array.forEach( item => {
        
        let templadeDiv = elTodoTemplate.cloneNode(true);
        
        templadeDiv.querySelector(".todo-text").textContent = item.todo;
        templadeDiv.querySelector(".todo-checkbox").dataset.todoId = item.id;
        templadeDiv.querySelector(".todo-delete").dataset.todoId = item.id;
        templadeDiv.querySelector(".todo-checkbox").checked = false
        
        
        if (item.isCompleted === true) {
            templadeDiv.querySelector(".todo-checkbox").checked = true
        }
        
        todoFragment.appendChild(templadeDiv)
    });
    
    wrapper.appendChild(todoFragment)
}


renderTodos(todoArray, elTodoList);


elTodoList.addEventListener("click", function (event) {
    
    let check = event.target.matches(".todo-checkbox");
    
    if (check) {
        let checkboxId = event.target.dataset.todoId;
        
        let foundTodo = todoArray.find(item => item.id == checkboxId)
        
        let foundTodoIndex = todoArray.findIndex(item => item.id == checkboxId)
        
        if (!foundTodo.isCompleted) {
            foundTodo.isCompleted = true
            todoArray[foundTodoIndex].isCompleted = true
            
            storage.setItem("newArray", JSON.stringify(todoArray));
            renderTodos(todoArray, elTodoList);
            todoCalculate(todoArray);

        } else {
            foundTodo.isCompleted = false
            todoArray[foundTodoIndex].isCompleted = false

            storage.setItem("newArray", JSON.stringify(todoArray));
            renderTodos(todoArray, elTodoList);
            todoCalculate(todoArray);
        }
        
    }
    
    let checkBoxBTn = event.target.matches(".todo-delete");
    
    if (checkBoxBTn) {
        
        let checkboxId = event.target.dataset.todoId;
        
        let foundTodoIndex = todoArray.findIndex(item => item.id == checkboxId)
        
        todoArray.splice(foundTodoIndex, 1)

        storage.setItem("newArray", JSON.stringify(todoArray));
        renderTodos(todoArray, elTodoList);
        todoCalculate(todoArray)
    }
})


function todoCalculate(array) {
    
    let complatedTodos = array.filter(item => item.isCompleted === true);
    let notComplatedTodo = array.filter(item => item.isCompleted === false);
    
    let allTodoNumber = array.length
    let complatedNumber = allTodoNumber - notComplatedTodo.length
    let notComplatedNumber = allTodoNumber - complatedNumber
    
    console.log(allTodoNumber,complatedNumber,notComplatedNumber);
    elTodoAllCount.textContent = allTodoNumber
    elTodoCompletedCount.textContent = complatedNumber
    elTodoUncompletedCount.textContent = notComplatedNumber
}


todoCalculate(todoArray)


elTodoControl.addEventListener("click", function (event) {
    
    let allBtn = event.target.matches(".all-btn");
    let copmlatedBtn = event.target.matches(".completed-btn");
    let uncomplatedBtn = event.target.matches(".uncompleted-btn");
    
    
    if (allBtn) {
        renderTodos(todoArray, elTodoList);
        
    } else if (copmlatedBtn) {
        let complatedTodos = todoArray .filter(item => item.isCompleted === true);
        renderTodos(complatedTodos, elTodoList);
    } else if (uncomplatedBtn) {
        let notComplatedTodo = todoArray.filter(item => item.isCompleted === false);
        renderTodos(notComplatedTodo, elTodoList);
    }{
        
    }
})