var titleInput = document.getElementById('toDoTitle');
var titleErrorMsg = document.getElementById('titleError');
var descriptionInput = document.getElementById('toDoDescription');
var descriptionErrorMsg = document.getElementById('descriptionError');
var tasksContainer = document.getElementById('tasksContainer');
var form = document.getElementById('myForm');
var tasksArray = [];
var editIndex = null;

function validateTitle() {
    var titleRegex = /^[a-zA-Z]{6,}$/;
    if (titleRegex.test(titleInput.value)) {
        titleErrorMsg.classList.add('t-none');
    }
    else {
        titleErrorMsg.classList.remove('t-none');
    }
}
function validateDescription() {
    var descriptionRegex = /^(?=.*\S).{20,}$/;
    if (descriptionRegex.test(descriptionInput.value)) {
        descriptionErrorMsg.classList.add('d-none');
    }
    else {
        descriptionErrorMsg.classList.remove('d-none');
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var title = titleInput.value;
    var description = descriptionInput.value;

    if (editIndex === null) {
        tasksArray.push({ title, description, completed: false });
    } else {
        tasksArray[editIndex] = { title, description, completed: tasksArray[editIndex].completed };
        editIndex = null;
    }

    titleInput.value = '';
    descriptionInput.value = '';
    displayFunc();
});

function displayFunc() {
    tasksContainer.innerHTML = '';

    tasksArray.forEach((task, index) => {
        var taskCard = document.createElement('div');
        taskCard.classList.add('taskCard');

        taskCard.style.backgroundColor = task.completed ? 'green' : '';
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button class="markCompleteBtn" onclick="markComplete(${index})">✅</button>
            <button class="editBtn" onclick="editTask(${index})">✏️</button>
            <button class="deleteBtn" onclick="deleteTask(${index})">🗑️</button>
        `;

        tasksContainer.appendChild(taskCard);
    });
}

function deleteTask(index) {
    tasksArray.splice(index, 1);
    displayFunc();
}

function markComplete(index) {
    tasksArray[index].completed = !tasksArray[index].completed;
    displayFunc();
}

function editTask(index) {
    var taskToEdit = tasksArray[index];
    titleInput.value = taskToEdit.title;
    descriptionInput.value = taskToEdit.description

    var addButton = document.querySelector('.addButton')
    addButton.setAttribute('value', 'Update')
    editIndex = index;

    form.removeEventListener('submit', resetAddButton); //hycancel el refresh el2wel 3shan y save
    form.addEventListener('submit', resetAddButton); //b3d kda 3ady
}

//by searching
function resetAddButton() {
    var addButton = document.querySelector('.addButton');
    addButton.setAttribute('value', 'Add');
    editIndex = null;
    form.removeEventListener('submit', resetAddButton);
}




function search() {
    const searchValue = document.querySelector('.search').value.toLowerCase();
    tasksContainer.innerHTML = '';

    tasksArray.forEach((task, index) => {
        if (task.title.toLowerCase().includes(searchValue)) {

            var taskCard = document.createElement('div');
            taskCard.classList.add('taskCard');
            taskCard.style.backgroundColor = task.completed ? 'green' : '';

            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button class="markCompleteBtn" onclick="markComplete(${index})">✅</button>
                <button class="editBtn" onclick="editTask(${index})">✏️</button>
                <button class="deleteBtn" onclick="deleteTask(${index})">🗑️</button>
            `;

            tasksContainer.appendChild(taskCard);
        }
    });
}

document.querySelector('.search').addEventListener('input', search);