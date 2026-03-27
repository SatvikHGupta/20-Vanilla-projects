const board = document.getElementById("board");
const addNoteBtn = document.getElementById("addNote");
const resetBtn = document.getElementById("resetNotes");
const themeToggle = document.getElementById("themeToggle");

let notes = [];
const colors = getComputedStyle(document.documentElement)
  .getPropertyValue('--note-colors').split(',');

function randomColor() {
  return colors[Math.floor(Math.random()*colors.length)].trim();
}

function createNote(content = "", pos = {left: 50, top: 50}) {
  const note = document.createElement("div");
  note.className = "note";
  note.setAttribute("role", "note");
  note.setAttribute("tabindex", "0");
  note.style.background = randomColor();
  note.style.setProperty("--rotate", `${Math.floor(Math.random()*10-5)}deg`);
  note.style.left = pos.left + "px";
  note.style.top = pos.top + "px";

  const dragHandle = document.createElement("div");
  dragHandle.className = "dragHandle";

  const textarea = document.createElement("textarea");
  textarea.value = content;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.textContent = "×";

  deleteBtn.addEventListener("click", () => {
    board.removeChild(note);
    notes = notes.filter(n => n !== note);
    saveNotes();
  });

  note.appendChild(dragHandle);
  note.appendChild(textarea);
  note.appendChild(deleteBtn);
  board.appendChild(note);
  notes.push(note);

  dragHandle.addEventListener("mousedown", dragStartMouse);
  dragHandle.addEventListener("touchstart", dragStartTouch, {passive: false});
  textarea.addEventListener("input", saveNotes);

  saveNotes();
  return note;
}

function saveNotes() {
  const data = notes.map(n => ({
    content: n.querySelector("textarea").value,
    left: n.offsetLeft,
    top: n.offsetTop
  }));
  localStorage.setItem("stickyNotes", JSON.stringify(data));
}

function loadNotes() {
  const data = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  data.forEach(item => createNote(item.content, {left: item.left, top: item.top}));
}

function resetBoard() {
  notes.forEach(n => board.removeChild(n));
  notes = [];
  localStorage.removeItem("stickyNotes");
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "Light";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "Dark";
    localStorage.setItem("theme", "light");
  }
}

addNoteBtn.addEventListener("click", () => createNote());
resetBtn.addEventListener("click", resetBoard);
themeToggle.addEventListener("click", toggleTheme);

/* ---------- Drag logic (mouse + touch) ---------- */

let dragItem = null;
let offsetX = 0;
let offsetY = 0;
let boardPageLeft = 0;
let boardPageTop = 0;

function getPageCoords(e) {
  if (e.touches && e.touches[0]) {
    return { x: e.touches[0].pageX, y: e.touches[0].pageY };
  }
  return { x: e.pageX, y: e.pageY };
}

function dragStartMouse(e) {
  if (e.button !== 0) return;
  dragStartCommon(e);
  document.addEventListener('mousemove', dragMoveMouse);
  document.addEventListener('mouseup', dragEndMouse);
}

function dragMoveMouse(e) {
  e.preventDefault();
  dragMoveCommon(e);
}

function dragEndMouse() {
  dragEndCommon();
  document.removeEventListener('mousemove', dragMoveMouse);
  document.removeEventListener('mouseup', dragEndMouse);
}

function dragStartTouch(e) {
  dragStartCommon(e);
  document.addEventListener('touchmove', dragMoveTouch, {passive: false});
  document.addEventListener('touchend', dragEndTouch);
}

function dragMoveTouch(e) {
  e.preventDefault();
  dragMoveCommon(e);
}

function dragEndTouch() {
  dragEndCommon();
  document.removeEventListener('touchmove', dragMoveTouch);
  document.removeEventListener('touchend', dragEndTouch);
}

function dragStartCommon(e) {
  dragItem = e.currentTarget.closest('.note');
  if (!dragItem) return;

  const boardRect = board.getBoundingClientRect();
  boardPageLeft = boardRect.left + window.scrollX;
  boardPageTop = boardRect.top + window.scrollY;

  const rect = dragItem.getBoundingClientRect();
  const rectPageLeft = rect.left + window.scrollX;
  const rectPageTop = rect.top + window.scrollY;

  const { x: pageX, y: pageY } = getPageCoords(e);

  offsetX = pageX - rectPageLeft;
  offsetY = pageY - rectPageTop;

  dragItem.style.position = 'absolute';
  dragItem.style.zIndex = 1000;
}

function dragMoveCommon(e) {
  if (!dragItem) return;
  const { x: pageX, y: pageY } = getPageCoords(e);

  let leftRel = pageX - offsetX - boardPageLeft;
  let topRel = pageY - offsetY - boardPageTop;

  const maxLeft = Math.max(0, board.clientWidth - dragItem.offsetWidth);
  const maxTop = Math.max(0, board.clientHeight - dragItem.offsetHeight);

  leftRel = Math.max(0, Math.min(leftRel, maxLeft));
  topRel = Math.max(0, Math.min(topRel, maxTop));

  dragItem.style.left = leftRel + 'px';
  dragItem.style.top = topRel + 'px';
}

function dragEndCommon() {
  if (dragItem) {
    dragItem.style.zIndex = '';
    saveNotes();
  }
  dragItem = null;
}

/* ---------- init ---------- */

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  themeToggle.textContent = "Dark";
}
loadNotes();
