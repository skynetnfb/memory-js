import {utils} from './utils';
import './styles/main.scss';


/////////////////CARTE DA GIOCO /////////////////
var memory_array = [
    './src/images/1.png','./src/images/1.png',
    './src/images/2.png','./src/images/2.png',
    './src/images/3.png','./src/images/3.png',
    './src/images/4.png','./src/images/4.png',
    './src/images/5.png','./src/images/5.png',
    './src/images/6.png','./src/images/6.png',
    './src/images/7.png','./src/images/7.png',
    './src/images/8.png','./src/images/8.png'
];

//var memory_values=[];
//var memory_tile_ids=[];
var first_card;
var second_card;
var stop;

var actual_score_value=0;
var firstFlippedCard=null;

//uTILIZZO OGGETTO JS
var partita = {
    score: 0,
    errors: 0,
};



var memory_board=document.createElement("div");
var scores= document.createElement('span');
const board=document.getElementById("board");
memory_board.setAttribute("id","memory-board");
board.appendChild(memory_board);
console.log(memory_board.getAttribute("id"));
console.log(board);

scores.setAttribute('id','scores');
//var score_title= document.createElement('h1');
//score_title.innerText='scores';
//scores.appendChild(score_title);
board.appendChild(scores);

var panel_score= document.createElement('span');
panel_score.setAttribute("class","panel");
var panel_error= document.createElement('span');
panel_error.setAttribute("class","panel");
var panel_score_text= document.createElement('h1');
var panel_error_text= document.createElement('h1');
panel_score_text.innerText='Punteggio';
panel_error_text.innerText='Errori';
panel_score.appendChild(panel_score_text);
panel_error.appendChild(panel_error_text);
scores.appendChild(panel_score);
scores.appendChild(panel_error);
var value_score_text= document.createElement('h2');
var value_error_text= document.createElement('h2');
value_score_text.innerText=partita.score;
value_error_text.innerText=partita.errors;
panel_score.appendChild(value_score_text);
panel_error.appendChild(value_error_text);

var panel_button= document.createElement('span');
panel_button.setAttribute("class","panel");
var panel_button_text= document.createElement('h1');
panel_button_text.innerText='prova';
panel_button.appendChild(panel_button_text);

//

var panel_timer= document.createElement('span');
panel_timer.setAttribute("class","panel");
var panel_timer_text= document.createElement('h1');
panel_timer_text.innerText='Timer';
panel_timer.appendChild(panel_timer_text);
var value_timer_text= document.createElement('h2');
value_timer_text.innerText="0";
panel_timer.appendChild(value_timer_text);
scores.appendChild(panel_timer);
scores.appendChild(panel_button);
/*



panel_timer.appendChild(panel_timer_text);

*/
/*

*/



Array.prototype.memory_card_shuffle= function () {
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
    //var timer= document.createElement('div');
    //timer.setAttribute('id','timer');
    //scores.appendChild(timer);
    var distance = 300;
    var x = setInterval(function() {
        var seconds = --distance ;
        console.log( distance );
        //document.getElementById('timer').innerHTML = seconds + "s ";
        value_timer_text.innerText=seconds + "s";
        if (seconds < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = 'Game Over';
                gameOver();
        }
    }, 1000);

    /////////////////////////////////////////////////

    //si mischiano gli elementi dell'array con la funzione aggiunta al prototype dell'array memory_card_shuffle
    //viene creato un elemento del dom card per ogni elemento dell'array
    // l'indice viene salvato nell'attributo name della carta
    //si aggiunge l'vento flip ad ogni carta
    //ogni elemento viene poi appeso al tavolo da gioco

    memory_array.memory_card_shuffle();
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
    console.log(stop);
    if(stop== undefined){
    if (first_card == undefined) {
        first_card = this;
        console.log('dentro if primo flip:' + first_card.getAttribute('name'));
        console.log(this);
        console.log(first_card);
        flip_card(first_card);
    } else if (first_card != undefined && second_card == undefined) {
        second_card = this;
        console.log('dentro if secondo flip:' + first_card.getAttribute('name'));
        console.log(this);
        console.log(second_card);
        flip_card(second_card);

        /*
        var cardContent = document.createElement('img');
        cardContent.setAttribute("src",memory_array[this.getAttribute('name')]);
        this.appendChild(cardContent);
        this.setAttribute("style", "background-color: red;");
        second_card=this;*/
    }
    if (first_card != undefined && second_card != undefined) {
        console.log('dentro if check');
        console.log(this);
        console.log(second_card);
        console.log(first_card);
        console.log('check prima carta:' + first_card.getAttribute('name'));
        console.log('check seconda carta:' + second_card.getAttribute('name'));
        if (memory_array[first_card.getAttribute('name')] == memory_array[second_card.getAttribute('name')]) {
            first_card.setAttribute("style", "background-color: green;");
            second_card.setAttribute("style", "background-color: green;");
            //firstFlippedCard = null;
            first_card = undefined;
            second_card = undefined;
            stop=undefined;
            actual_score_value = ++actual_score_value;
            partita.score = ++partita.score;
            value_score_text.innerText=partita.score;
            console.log('score:' + actual_score_value);
            console.log('partita score:' + partita.score);
        } else {
            console.log('primo valore:' + first_card.getAttribute('name'));
            console.log('secondo valore:' + this.getAttribute('name'));

            //ARROW FUNCTION CLOSURE
            setTimeout(() => {
                first_card.removeChild(first_card.lastElementChild);
                first_card.setAttribute("style", "background-color: #FFD02A;");
                this.removeChild(second_card.lastElementChild);
                this.setAttribute("style", "background-color: #FFD02A;");
                //firstFlippedCard = null;
                first_card = undefined;
                second_card = undefined;
                stop=undefined;
                partita.errors=++partita.errors;
                value_error_text.innerText=partita.errors;
                console.log('errori:'+ partita.errors)
            }, 1000);
        }

    }
}



    function flip_card(current_card) {
        console.log(current_card.getAttribute('name'));
        let cardContent = document.createElement('img');
        cardContent.setAttribute("src", memory_array[current_card.getAttribute('name')]);
        current_card.appendChild(cardContent);
        current_card.setAttribute("style", "background-color: red;");
        if(second_card!=undefined)stop=1;
    }

    function check_card(){

    }

}

function gameOver(){
    board.removeChild(memory_board)
};


newBoard();

