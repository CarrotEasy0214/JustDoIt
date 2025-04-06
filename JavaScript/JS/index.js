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

rl.question('점수를 입력하세요', function (input) {
  const score = Number(input);
  const grade = checkGrade(score);
  console.log(`당신의 등급은 ${grade}입니다.`);
  rl.close();
});
