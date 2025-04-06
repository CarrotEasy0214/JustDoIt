const tasks = [
  { id: 1, title: '자바스크립트 공부하기', done: false },
  { id: 2, title: '리액트 튜토리얼 따라하기', done: false },
  { id: 3, title: '코딩 문제 풀기', doen: true },
];

function displayTasks(taskList) {
  console.log('--- 할 일 목록 ---');

  taskList.forEach((task) => {
    const status = task.done ? '완료' : '미완료';
    console.log(`${task.id}.${task.title}-${status}`);
  });
  console.log('----------------------\n');
}

displayTasks(tasks);
