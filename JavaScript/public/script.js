document.getElementById('guessForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const input = document.getElementById('numberInput');
    const number = input.value;
  
    const response = await fetch('/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `number=${number}`,
    });
  
    const resultText = await response.text();
  
    document.getElementById('result').textContent = resultText;
    input.value = '';
  });
  