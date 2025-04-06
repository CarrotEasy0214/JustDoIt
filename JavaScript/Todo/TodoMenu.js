const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [
  { id: 1, title: '자바스크립트 공부하기', done: false },
  { id: 2, title: '운동하기', done: true },
];

function displayTasks(taskList) {
  taskList.forEach((task) => {
    const status = task.done ? '[완료]' : '[미완료]';
    console.log(`${task.title}-${status}`);
  });
}

function askForNewTask() {
  rl.question('새 할일을 입력하세요:', (input) => {
    const newTask = {
      id: tasks.length + 1,
      title: input,
      done: false,
    };

    tasks.push(newTask);

    console.log('\n 현재 할 일 목록');
    displayTasks(tasks);
    askForCompletion();
  });
}

function askForCompletion() {
  rl.question('\n완료할 작업 번호를 입력하세요: ', (input) => {
    const id = Number(input);

    const task = tasks.find((t) => t.id === id);

    if (task) {
      task.done = true;
      console.log(`✅ '${task.title}'가 완료 처리되었습니다!\n`);
    } else {
      console.log('❌ 해당 작업을 찾을 수 없습니다.');
    }

    displayTasks(tasks);
    rl.close();
  });
}

displayTasks(tasks);
askForNewTask();
