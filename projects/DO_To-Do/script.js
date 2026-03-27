const input = document.getElementById("input");
const list = document.getElementById("list");
const addBtn = document.getElementById("btn");
const completedList = document.getElementById("completed-list");

addBtn.addEventListener("click", () => {
  const task = input.value.trim();
  if (task === "") return;

  const li = document.createElement("li");

  li.innerHTML = `
    <span class="task-text">${task}</span>
    <div class="task-buttons">
      <button class="done-btn">Done</button>
      <button class="impossible-btn">Impossible</button>
    </div>
  `;

  li.classList.add("slideIn");
  list.appendChild(li);
  input.value = "";

  const doneBtn = li.querySelector(".done-btn");
  const impossibleBtn = li.querySelector(".impossible-btn");

  doneBtn.addEventListener("click", () => {
    li.classList.add("slideOut");
    setTimeout(() => {
      li.remove();
      addToCompleted(task);
    }, 500);
  });

  impossibleBtn.addEventListener("click", () => {
    li.classList.add("slideOut");
    setTimeout(() => li.remove(), 500);
  });
});

function addToCompleted(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span class="task-text">${task}</span>
    <div class="task-buttons">
      <button class="remove-btn">❌</button>
    </div>
  `;

  li.classList.add("slideIn");
  completedList.appendChild(li);

  const removeBtn = li.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    li.classList.add("slideOut");
    setTimeout(() => li.remove(), 500);
  });
}
