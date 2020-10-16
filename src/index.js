import {utils} from './utils';
import './styles/main.scss'
console.log('hello world!!!!');




var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var memory_values=[];
var memory_tile_ids=[];
var  tiles_flipped=0;
var first_card;
var second_card;

var actual_score_value=0;
var firstFlippedCard=null;


var game = {
    score: 0,
    errors: 0,
};


var score_title= document.createElement('h1');
var memory_board=document.createElement("div");
var scores= document.createElement('span');
const board=document.getElementById("board");
memory_board.setAttribute("id","memory-board");
board.appendChild(memory_board);
console.log(memory_board.getAttribute("id"));
console.log(board);

scores.setAttribute('id','scores');
score_title.innerText='scores';
scores.appendChild(score_title);
board.appendChild(scores);


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
    console.log(memory_array);
    for(var i = 0; i < memory_array.length; i++){
        let card= document.createElement('div');
        card.setAttribute('id','card'+i);
        console.log(i.toString());
        card.setAttribute('name',i.toString());
        card.addEventListener("click", flip);
        document.getElementById('memory-board').appendChild(card)
}
}
function flip() {
    console.log('card flipped:'+this.id);
    console.log(this);
    function flip_first(current_card) {
        first_card=current_card;
        console.log(current_card.getAttribute('name'));
        let cardContent = document.createElement('p');
        //cardContent.innerText = current_card.getAttribute('name');
        cardContent.innerText = memory_array[current_card.getAttribute('name')];
        current_card.appendChild(cardContent);
        current_card.setAttribute("style", "background-color: red;");
        firstFlippedCard=current_card.getAttribute('name')}

    if(firstFlippedCard==null){
        flip_first(this);

    }else

        var cardContent = document.createElement('span');
        cardContent.innerText = memory_array[this.getAttribute('name')];
        this.appendChild(cardContent);
        second_card=this;
        second_card.setAttribute("style", "background-color: red;");
        console.log(memory_array[this.getAttribute('name')]);

        if(memory_array[first_card.getAttribute('name')]==memory_array[this.getAttribute('name')]){
            first_card.setAttribute("style","background-color: green;");
            this.setAttribute("style","background-color: green;");
            firstFlippedCard=null;
            first_card=null;
            second_card=null;
    actual_score_value=++actual_score_value;
    console.log('score:'+actual_score_value);
    }else {
            console.log('primo valore:'+first_card.getAttribute('name'));
            console.log('secondo valore:'+this.getAttribute('name'));
            setTimeout(() => {
                first_card.removeChild(first_card.lastElementChild);
                first_card.setAttribute("style","background-color: #FFD02A;");
                this.setAttribute("style","background-color: #FFD02A;");
                this.removeChild(second_card.lastElementChild);
                firstFlippedCard=null;
                first_card=null;
                second_card=null;
            }, 1000);
        }

}

function gameOver(){
    board.removeChild(memory_board)
};

/*
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
}*/

newBoard();

