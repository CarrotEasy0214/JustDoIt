let tasks = [];

const form = document.querySelector('form');
const input = document.querySelector('input');
const incompleteList = document.querySelector('#incomplete-list');
const completeList = document.querySelector('#complete-list');
const totalCount = document.querySelector('#total-count');
const doneCount = document.querySelector('#done-count');
const notDoneCount = document.querySelector('#not-done-count');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text === '') return;

  const newTask = {
    id: Date.now(),
    text: text,
    done: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  input.value = '';
  saveTasks();
  renderTasks();
});

function renderTasks() {
  incompleteList.innerHTML = '';
  completeList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.style.marginRight = '10px';
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (${new Date(
      task.createdAt
    ).toLocaleString()})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    const editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.style.marginLeft = '10px';
    editButton.addEventListener('click', () => {
      li.innerHTML = '';

      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = task.text;
      editInput.style.marginRight = '10px';

      const saveButton = document.createElement('button');
      saveButton.textContent = '저장';
      saveButton.style.marginLeft = '10px';

      saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText !== '') {
          task.text = newText;
          saveTasks();
          renderTasks();
        }
      });

      li.appendChild(editInput);
      li.appendChild(saveButton);
    });

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    if (task.done) {
      completeList.appendChild(li);
    } else {
      incompleteList.appendChild(li);
    }
  });

  updateCounts();
}

function updateCounts() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const notDone = total - done;

  totalCount.textContent = total;
  doneCount.textContent = done;
  notDoneCount.textContent = notDone;
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

loadTasks();
renderTasks();
