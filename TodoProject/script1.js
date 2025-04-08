let tasks = [];

const form = document.querySelector('form');
const input = document.querySelector('input');
const incompleteList = document.querySelector('#incomplete-list');
const completeList = document.querySelector('#complete-list');
const totalCount = document.querySelector('#total-count');
const doneCount = document.querySelector('#done-count');
const notDoneCount = document.querySelector('#not-done-count');
const clearAllButton = document.querySelector('#clear-all');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = input.value.trim();

  if (text == '') {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    done: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  renderTasks();

  input.value = '';
});

function renderTasks() {
  const sortOption = sortSelect.value;
  if (sortOption === 'created-desc') {
    tasks.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortOption === 'oldest') {
    tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  incompleteList.innerHTML = '';
  completeList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    li.textContent = `${task.text}(${task.createdAt.toLocaleString()})`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.style.marginLeft = '10px';

    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    const editButton = document.createElement('button');
    editButton.textContent = '수정';
    deleteButton.style.marginLeft = '10px';

    editButton.addEventListener('click', () => {
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = task.text;

      li.innerHTML = '';
      li.appendChild(inputEdit);
      inputEdit.focus();

      inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          task.text = inputEdit.value.trim();
          renderTasks();
        }
      });
    });

    li.appendChild(deleteButton);
    li.prepend(checkbox);
    li.appendChild(editButton);

    if (task.done) {
      completeList.appendChild(li);
    } else {
      incompleteList.appendChild(li);
    }
  });

  totalCount.textContent = tasks.length;
  doneCount.textContent = tasks.filter((task) => task.done).length;
  notDoneCount.textContent = tasks.filter((task) => !task.done).length;
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks = JSON.parse(savedTasks).map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  }
}

clearAllButton.addEventListener('click', () => {
  if (confirm('정말 모든 할 일들을 삭제하시겠습니까?')) {
    tasks = [];
    localStorage.removeItem('tasks');
    renderTasks();
  }
});

const sortSelect = document.querySelector('#sort');

sortSelect.addEventListener('change', renderTasks);

loadTasks();
renderTasks();
