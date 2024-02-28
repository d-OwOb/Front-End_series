let listState = [];

const STATE_KEY = "todo-list";

function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState != null) {
    return JSON.parse(listState);
  }
  return [];
}

function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function initialList() {
  //load state
  listState = loadState();
  //render list
  const list = document.getElementById("list");
  for (const item of listState) {
    const li = document.createElement("li");
    li.innerText = item.text;
    li.classList.add("item");

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = deleteItem;

    if (item.checked === true) {
      li.classList.add("checked");
    }
    li.onclick = checkItem;

    li.appendChild(deleteBtn);
    list.appendChild(li);
  }
}

function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const text = input.value;
  if (text === "") {
    alert("請輸入備忘錄!!");
    return;
  }

  const new_item = document.createElement("li");
  new_item.classList.add("item");
  new_item.innerText = text;

  new_item.onclick = checkItem;

  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete");

  deleteBtn.onclick = deleteItem;
  new_item.appendChild(deleteBtn);

  listState.push({
    text,
    checked: false,
  });
  saveState(listState);

  input.value = "";
  ul.appendChild(new_item);
}

function checkItem() {
  const item = this;
  const parent = item.parentNode;
  const index = Array.from(parent.childNodes).indexOf(item);
  listState[index].checked = !listState[index].checked;
  saveState(listState);
  item.classList.toggle("checked");
}

function deleteItem(e) {
  const item = this.parentNode;
  const list = document.getElementById("list");
  const index = Array.from(list.childNodes).indexOf(item);
  listState = listState.filter((e, i) => i !== index);
  list.removeChild(item);
  saveState(listState);
  e.stopPropagation();
}

// ---------------------------------------------------

initialList();

const addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", (e) => {
  addItem();
});

const form = document.getElementById("input-wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
