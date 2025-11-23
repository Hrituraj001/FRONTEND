const STORAGE_KEY = "todoTasks_v1";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2,7);
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const text = document.createElement("div");
    text.className = "task-text";
    text.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.className = "small-btn edit";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => beginEdit(task.id, li);

    const delBtn = document.createElement("button");
    delBtn.className = "small-btn delete";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(task.id);

    li.append(text, editBtn, delBtn);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  if (!text.trim()) return;

  tasks.unshift({ id: uid(), text });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function beginEdit(id, li) {
  const task = tasks.find(t => t.id === id);
  li.innerHTML = "";

  const input = document.createElement("input");
  input.value = task.text;
  input.style.flex = "1";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "small-btn save";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "small-btn";

  saveBtn.onclick = () => finishEdit(id, input.value);
  cancelBtn.onclick = renderTasks;

  li.append(input, saveBtn, cancelBtn);
  input.focus();
}

function finishEdit(id, newText) {
  if (!newText.trim()) {
    deleteTask(id);
    return;
  }

  tasks = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
  saveTasks();
  renderTasks();
}

addBtn.onclick = () => addTask(taskInput.value);
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask(taskInput.value);
});

loadTasks();
renderTasks();
