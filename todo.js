function addTodo() {

let todoElem = document.querySelector('.todo-js').value;

let todoDate = document.querySelector('.todo-date').value;

class Todo{
    constructor(todo, todoDate) {
        
        this.todo = todo;
        this.todoDate = todoDate;
    };
};

const todoList = new Todo(todoElem, todoDate);

console.log(todoList);

const renderTodoList = document.querySelector('.render-todo');

renderTodoList.innerHTML += `<div class="todo-style"><div class="todo-elem-container"><div class="todo"> ${todoList.todo}</div><div class="todo-date-elem">${todoList.todoDate}</div><button class="delete-btn">delete</button></div></div>`;
document.
querySelector('.todo-js').value= "";

document.
querySelector('.todo-date').value= "";
};




document.querySelector('.render-todo').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const todoItem = event.target.closest('.todo-elem-container');
    if (todoItem) {
      todoItem.remove();
    }
  }
});
