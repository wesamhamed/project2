let todosArray = [
  {
    id: 1,
    title: "first todo",
    details: "this is my first todo",
    dateToComplete: "2015-03-25",
    done: false
  }
];
function randomColor() {
  return (
    "rgba(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.random() +
    ")"
  );
}
let count = 1;
const addButton = document.getElementById("add");

function getTodos() {
  let todos = document.querySelectorAll(".todo");
  return Array.from(todos);
}
let todos = getTodos();

function changeColor() {
  todos = getTodos();
  todos.forEach(todo => {
    todo.addEventListener("click", function(e) {
      todo.style.backgroundColor = randomColor();
    });
  });
}
changeColor();
function removeTodo() {
  let removeButton = document.querySelectorAll(".remove");
  removeButton = Array.from(removeButton);

  removeButton.forEach(button => {
    button.addEventListener("click", function(e) {
      let parentButton = e.target.parentNode;
      let parentTodo = parentButton.parentNode;
      parentTodo.removeChild(parentButton);
    });
  });
}
removeTodo();
function addTodo() {
  addButton.addEventListener("click", function(e) {
    let title = prompt("Enter Title");
    let detail = prompt("Enter Details");
    let date = prompt("Enter Date");
    date = new Date(date).getTime();
    while (date == 0 || isNaN(date)) {
      date = prompt("Enter Date");
      date = new Date(date).getTime();
    }
    date = new Date(date);
    let formatted_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    let done = false;
    let id = count;

    let content = document.getElementById("content");
    content.innerHTML += `
    <div class="todo" id=${count++}>
            <h2 class="title">
              ${title}
            </h2>
            <p class="detail">
              ${detail}
            </p>
            <p class="date">${formatted_date}</p>
            <button class="remove">Remove Todo</button>
          </div>`;
    let todoObect = {
      id: count,
      details: detail,
      date: date,
      done: done
    };
    todosArray.push(todoObect);

    changeColor();
    removeTodo();
  });
}

addTodo();

const switchButton = document.getElementById("switch");
function rearangeTodos() {
  switchButton.addEventListener("click", function(e) {
    if (content.style.flexDirection === "row") {
      content.style.flexDirection = "column";
    } else {
      content.style.flexDirection = "row";
    }
  });
}
rearangeTodos();
const searchInput = document.getElementById("search");
function searchTodos() {
  searchInput.addEventListener("search", function(e) {
    let searchInput = e.target.value.toLocaleLowerCase();
    todos.forEach(todo => {
      let title = todo
        .querySelector(".title")
        .textContent.trim()
        .toLocaleLowerCase();
      if (title.includes(searchInput) && searchInput != "") {
        todo.style.display = "block";
      } else {
        todo.style.display = "none";
      }
    });
  });
}

searchTodos();
const sortButton = document.getElementById("sort");
function removeAllTodos() {
  let todosNodes = document.querySelectorAll(".todo");
  todosNodes.forEach(todo => {
    let parent = todo.parentNode;
    parent.removeChild(todo);
  });
}
function sortTodos() {
  sortButton.addEventListener("click", function(e) {
    todos.sort(function(todo1, todo2) {
      return (
        new Date(todo1.querySelector(".date").textContent).getTime() -
        new Date(todo2.querySelector(".date").textContent).getTime()
      );
    });
    let content = document.getElementById("content");
    removeAllTodos();
    todos.forEach(todo => {
      content.appendChild(todo);
    });
  });
}
sortTodos();
