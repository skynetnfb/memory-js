import {utils} from './utils';
import './styles/main.scss'
console.log('hello world!!!!');




var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var memory_values=[];
var memory_tile_ids=[];
var  tiles_flipped=0;

const board=document.getElementById("board");
var memory_board=document.createElement("div");
memory_board.setAttribute("id","memory-board");
board.appendChild(memory_board);
console.log(memory_board.getAttribute("id"));
console.log(board);
var scores= document.createElement('span');
scores.setAttribute('id','scores');
var score_title= document.createElement('h1');
var actual_score_value=0;
score_title.innerText='scores';
scores.appendChild(score_title);
//var history= document.createElement(div);
//scores.setAttribute('id','history');
board.appendChild(scores);
//board.appendChild(history);

//document.getElementById ("memory_board").addEventListener ("click", memoryFlipTile, false);

Array.prototype.memory_tile_shuffle= function () {
    var i = this.length, j, temp;
    while(i-->0){
        j=Math.floor(Math.random()* (i+1));
        temp = this[j];
        this[j]=this[i];
        this[i]=temp;
    }

}
function newBoard(){
    ////////////////////////TIMER///////////////////////////
    var timer= document.createElement('div');
    timer.setAttribute('id','timer');
    scores.appendChild(timer);
    var distance = 1000;
    var x = setInterval(function() {
        var seconds = --distance ;
        console.log( distance );
        document.getElementById('timer').innerHTML = seconds + "s ";
        if (seconds < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = 'Game Over';
                gameOver();
        }
    }, 10000);
    /////////////////////////////////////////////////

    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        let card= document.createElement('div');
        card.setAttribute('id','card'+i);
        card.addEventListener("click", flip);
        document.getElementById('memory-board').appendChild(card)
}
}
function flip() {
    console.log('card flipped:'+this.id);
    console.log(this);
    if(true){
    actual_score_value=++actual_score_value;
    console.log('score:'+actual_score_value);
    }

}
function memoryAlert(){
    //alert('Hello World!');
}
function gameOver(){
    board.removeChild(memory_board)
};
function memoryFlipTile(tile,val){
    console.log("qui");
    if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]){
                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared
                if(tiles_flipped == memory_array.length){
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                console.log("qui2");
                function flip2Back(){
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
}

newBoard();

