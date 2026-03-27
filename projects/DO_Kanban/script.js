let tasks = JSON.parse(localStorage.getItem("kanbanTasks") || "[]");

function renderBoard() {
  ["todo", "in-progress", "done"].forEach(status => {
    const container = document.getElementById(status);
    container.innerHTML = "";
    tasks.filter(t => t.status === status).forEach(task => {
      const div = document.createElement("div");
      div.className = "task";
      div.draggable = true;
      div.dataset.id = task.id;

      const span = document.createElement("span");
      span.textContent = task.title;

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.innerHTML = "🗑";
      delBtn.onclick = () => deleteTask(task.id);

      div.appendChild(span);
      div.appendChild(delBtn);

      div.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", task.id);
        setTimeout(() => div.classList.add("dragging"), 0);
      });
      div.addEventListener("dragend", () => div.classList.remove("dragging"));

      container.appendChild(div);
    });
  });
}

function addTask(status) {
  const input = document.getElementById(`new-${status}`);
  const title = input.value.trim();
  if (!title) return;
  const task = { id: Date.now(), title, status };
  tasks.push(task);
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  input.value = "";
  renderBoard();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  renderBoard();
}

["todo", "in-progress", "done"].forEach(status => {
  const col = document.getElementById(status);
  col.addEventListener("dragover", e => e.preventDefault());
  col.addEventListener("dragenter", () => col.classList.add("drag-over"));
  col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
  col.addEventListener("drop", e => {
    const id = e.dataTransfer.getData("text/plain");
    const task = tasks.find(t => t.id == id);
    task.status = status;
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
    col.classList.remove("drag-over");
    renderBoard();
  });
});

renderBoard();
