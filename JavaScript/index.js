const express = require('express');
const app = express();

const PORT = 3000;

let answer = Math.floor(Math.random()*10)+1;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.post('/guess',(req,res)=>{
    const guess = Number(req.body.number);

    if(guess < answer){
        res.send('더 높아요!');
    } else if(guess > answer){
        res.send('더 낮아요!')
    } else {
        answer = Math.floor(Math.random()*10)+1
        res.send('정답입니다. 새로운 숫자를 제시하겠습니다.')
    }
}) 

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT} 에서 게임 실행 중`)
})