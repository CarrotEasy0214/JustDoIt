document.querySelector('#intro-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:${value}`);
  }

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('서버응답:', result);
      alert('전송완료!');
    })
    .catch((err) => {
      console.error('에러발생:', err);
    });
});
