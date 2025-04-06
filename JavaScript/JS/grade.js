const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else {
    return 'F';
  }
}

function askScore() {
  rl.question('점수를 입력하세요(종료하려면 "종료" 입력):', function (input) {
    if (input.trim().toLowerCase() === '종료') {
      console.log('프로그램을 종료합니다.');
      rl.close();
      return;
    }
    const score = Number(input);

    if (isNaN(score)) {
      console.log('숫자를 입력해주세요.');
      askScore();
      return;
    }

    const grade = checkGrade(score);
    console.log(`당신의 등급은 ${grade}입니다.\n`);

    // 다시 점수 입력 받기
    askScore();
  });
}

askScore();
