// STYLE CHANGE 
const html = document.getElementsByTagName("html")[0];
const themeChange = document.getElementById("themeIcon");
themeChange.addEventListener("click", () => {
    html.classList.toggle("nuit");
    if (html.classList.contains("nuit")) {
        themeChange.innerHTML = "&#9789;";
        console.log('mode nuit')
    } else {
        themeChange.innerHTML = "&#x2600";
        console.log('mode jour')
    }
});


// SELECT
const todoTitle = document.querySelector('.todo-title');
const todoImportance = document.querySelector('.todo-importance');
const todoSubmit = document.querySelector('.todo-submit');
const todoList = document.querySelector('.todo-list');

// LISTEN
todoSubmit.addEventListener('click', addToDo)

// FUNCTIONS
function addToDo(event){
    // remove the form action
    event.preventDefault();
    // check fields
    checkfields();


    // div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // créer ma col1
    const todoCol1 = document.createElement('div');
    todoDiv.appendChild(todoCol1);
        // créer ma due date
        const todoDueDate = document.createElement('div');
        todoDueDate.innerText = 'Deadline';
        todoCol1.appendChild(todoDueDate);
        // créer ma due date
        const todoStatus = document.createElement('div');
        todoStatus.innerText = 'Status';
        todoCol1.appendChild(todoStatus);
    // créer ma col2
    const todoCol2 = document.createElement('div');
    todoDiv.appendChild(todoCol2);
        // créer ma due date
        const todoTitle = document.createElement('div');
        todoTitle.innerText = 'Title';
        todoCol2.appendChild(todoTitle);
        // créer ma due date
        const todoDescription = document.createElement('div');
        todoDescription.innerText = 'Description';
        todoCol2.appendChild(todoDescription);
    // créer ma col3
    const todoCol3 = document.createElement('div');
    todoCol3.innerText = 'Priority';
    todoDiv.appendChild(todoCol3);
    // créer ma col4
    const todoCol4 = document.createElement('div');
    todoCol4.innerText = 'Edit';
    todoDiv.appendChild(todoCol4);

    // ajouter TODO à TODOLIST
    todoList.appendChild(todoDiv);

    //réinitialiser les data
    todoTitle.value = "";
    
}

function checkfields(){
    console.log(todoTitle.value);
    console.log(todoImportance.value);
    if(todoImportance.value > 5){
        todoImportance.setCustomValidity("You gotta fill this out, yo!");    }
}