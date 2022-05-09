var shuffled = [];
var rand;
var rand2;
var flipped = [];
var score = 0;
var similar = [];
var gameover = 1;
var startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', ()=>{
    startBtn.disabled = "true";
    score = 0;
    document.getElementById('score').value = score;
    gameover = 0;
});

for(var i = 0; i < 9; i++)
{
    do{
        rand = Math.floor(Math.random() * 18);
        rand2 = Math.floor(Math.random() * 18);
    }while(shuffled[rand] != null || shuffled[rand2] != null || rand == rand2);
    shuffled[rand] = i;
    shuffled[rand2] = i;
}

function viewAllCards(){
    var card = '';
    for(var i = 0; i < shuffled.length; i++)
    {
        card += `<div class="col-md-2 cont">
                    <div class="item">
                        <div class="row h-100">
                            <div id="flip${i}" onclick="viewCard(${i})" class="hidden d-flex justify-content-center align-items-center">
                                <p>?</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    document.getElementById('cards').innerHTML = card;
}
viewAllCards();
function viewCard(index){
    if(gameover)return;
    var flipCard = '';
    if(!similar.includes(index))
    {
        flipCard += `<div class="cont2 d-flex justify-content-center align-items-center">
                        <img src="./images/img${shuffled[index]+1}.png" class="w-100 h-100">
                    </div>`;
        document.getElementById(`flip${index}`).innerHTML = flipCard;
    }
    if(!flipped.includes(index) && !similar.includes(index))
    {
        flipped.push(index);
    }
    setTimeout(()=>{
        checkNumFlipped();
        setTimeout(()=>{
            if(score == 9)
            {
                gameover = 1;
                document.getElementById('container').innerHTML += '<div id="gameover" class="gameover">YOU WIN !!!</div>';
            }
        }, 350)
    }, 400);
}
function checkNumFlipped(){
    
    setTimeout(()=>{
        if(flipped.length == 2)
        {
            if(shuffled[flipped[0]] == shuffled[flipped[1]])
            {
                similar.push(flipped[0]);
                similar.push(flipped[1]);
                score++;
                document.getElementById('score').value = score;
            }
            else
            {
                document.getElementById(`flip${flipped[0]}`).innerHTML = `<p>?</p>`;
                document.getElementById(`flip${flipped[1]}`).innerHTML = `<p>?</p>`;
            }
            flipped = [];
        }
        else if (flipped.length == 3)
        {
            document.getElementById(`flip${flipped[0]}`).innerHTML = `<p>?</p>`;
            document.getElementById(`flip${flipped[1]}`).innerHTML = `<p>?</p>`;
            document.getElementById(`flip${flipped[2]}`).innerHTML = `<p>?</p>`;
            flipped = [];
        }
    }, 300);
    
}
