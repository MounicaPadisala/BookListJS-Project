//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all the event listners
loadEventListners();

//load all the event listners
//DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);
function loadEventListners() {
  //Add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter task event
  filter.addEventListener('keyup', filterTasks);
}
// get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    //creat li element
  const li = document.createElement('li');
  //add Class
  li.className = 'collection-item';
  //create text node and append to the li's
  li.appendChild(document.createTextNode(task));
  //create new link element
  const link = document.createElement('a');
  //add class name
  link.className = 'delete-item secondary-content';

  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to the li
  li.appendChild(link);
  //append li to the ul
  taskList.appendChild(li);
  })
}  
// add task
function addTask(e) {
  if (taskInput.value === '') {
    alert("Add a Task"); 
    //console.log('hello')
  }
  //creat li element
  const li = document.createElement('li');
  //add Class
  li.className = 'collection-item';
  //create text node and append to the li's
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  //add class name
  link.className = 'delete-item secondary-content';

  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to the li
  li.appendChild(link);
  //append li to the ul
  taskList.appendChild(li);

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear the input
  taskInput.value = '';
  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
    
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//add removeTask function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove(); 
      
      // remove from local storage
      removeTaskFromLcoalStorage(e.target.parentElement.parentElement);
    }
    
  } 
}

// remove from LS
function removeTaskFromLcoalStorage(taskItem) {
   let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
// add clearTask function
function clearTasks(e) {
  //taskList.innerHTML = '';

  //faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear tasks from LS
  clearTasksFromLocalStorage();
}
//clear tasks from LS
function clearTasksFromLocalStorage() {
  confirm('Are you sure?');
  localStorage.clear();
}
// add filterTasks function 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
      
    } else {
      task.style.display = 'none';
      
    }
  });

  console.log(text);
}
    