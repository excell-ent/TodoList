document.addEventListener('DOMContentLoaded', () => {
  const renderTodoList = document.querySelector('.render-todo');
  const todoInput = document.querySelector('.todo-js');
  const dateInput = document.querySelector('.todo-date');
  const clearAllBtn = document.querySelector('.clear-all');
  const modeToggle = document.querySelector('.mode-toggle');
  const addBtn = document.querySelector('.add-btn');

  function renderTodo(todoItem) {
    return `<div class="todo-style" data-id="${todoItem.id}">
      <div class="todo-elem-container">
        <div class="todo">${todoItem.todo}</div>
        <div class="todo-date-elem">${todoItem.todoDate}</div>
        <button class="delete-btn">delete</button>
      </div>
    </div>`;
  }

  function showEmptyMessage() {
    renderTodoList.innerHTML = `<br><div class="empty-msg">No tasks yet. Add one!</div>`;
  }

  function hideEmptyMessage() {
    const emptyMsg = document.querySelector('.empty-msg');
    if (emptyMsg) emptyMsg.remove();
  }

  function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (savedTodos.length === 0) {
      showEmptyMessage();
    } else {
      savedTodos.forEach(todoItem => {
        renderTodoList.innerHTML += renderTodo(todoItem);
      });
    }
  }

  function updateLocalStorageAfterDelete() {
    const todos = [];
    document.querySelectorAll('.todo-style').forEach(todoDiv => {
      const id = Number(todoDiv.dataset.id);
      const todoText = todoDiv.querySelector('.todo').textContent.trim();
      const todoDate = todoDiv.querySelector('.todo-date-elem').textContent.trim();
      todos.push({ id, todo: todoText, todoDate });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    if (todos.length === 0) showEmptyMessage();
  }

  function addTodo() {
    console.log("Clicked add button"); // Debug: ensure this runs ONLY when clicked

    const todoElem = todoInput.value.trim();
    const todoDate = dateInput.value.trim();

    if (!todoElem || !todoDate) {
      showAlert("Please fill in both the task and date.");
      return;
    }

    class Todo {
      constructor(todo, todoDate) {
        this.todo = todo;
        this.todoDate = todoDate;
      }
    }

    const todoList = new Todo(todoElem, todoDate);
    todoList.id = Date.now();

    renderTodoList.innerHTML += renderTodo(todoList);
    hideEmptyMessage();

    let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.push(todoList);
    localStorage.setItem('todos', JSON.stringify(storedTodos));

    todoInput.value = "";
    dateInput.value = "";
  }

  // ✅ Add Todo button click event
  addBtn?.addEventListener('click', () => {
    addTodo(); // Only runs on click
  });

  // ✅ Delete single task
  renderTodoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const todoItem = event.target.closest('.todo-style');
      if (todoItem) {
        showConfirm("Are you sure you want to delete this task?", (confirmed) => {
          if (confirmed) {
            todoItem.remove();
            updateLocalStorageAfterDelete();
          }
        });
      }
    }
  });

  // ✅ Clear All
  clearAllBtn?.addEventListener('click', () => {
    showConfirm("Clear all tasks?", (confirmed) => {
      if (confirmed) {
        localStorage.removeItem('todos');
        renderTodoList.innerHTML = '';
        showEmptyMessage();
      }
    });
  });

  // ✅ Mode toggle
  modeToggle?.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  });

  // ✅ Load saved todos on first load
  loadTodos();

  // ✅ Custom alert & confirm modal functions
  function showAlert(message) {
    const modal = document.querySelector('.custom-modal');
    const modalMessage = modal.querySelector('.modal-message');
    const okBtn = modal.querySelector('.modal-ok');
    const cancelBtn = modal.querySelector('.modal-cancel');

    modalMessage.textContent = message;
    cancelBtn.classList.add('hidden');
    modal.classList.remove('hidden');

    okBtn.onclick = () => {
      modal.classList.add('hidden');
    };
  }

  function showConfirm(message, callback) {
    const modal = document.querySelector('.custom-modal');
    const modalMessage = modal.querySelector('.modal-message');
    const okBtn = modal.querySelector('.modal-ok');
    const cancelBtn = modal.querySelector('.modal-cancel');

    modalMessage.textContent = message;
    cancelBtn.classList.remove('hidden');
    modal.classList.remove('hidden');

    okBtn.onclick = () => {
      modal.classList.add('hidden');
      callback(true);
    };

    cancelBtn.onclick = () => {
      modal.classList.add('hidden');
      callback(false);
    };
  }
});