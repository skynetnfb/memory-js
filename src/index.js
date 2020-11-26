import './styles/main.scss';

/////////////////CARTE DA GIOCO /////////////////
const memory_array = [
    './src/images/1.png', './src/images/1.png',
    './src/images/2.png', './src/images/2.png',
    './src/images/3.png', './src/images/3.png',
    './src/images/4.png', './src/images/4.png',
    './src/images/5.png', './src/images/5.png',
    './src/images/6.png', './src/images/6.png',
    './src/images/7.png', './src/images/7.png',
    './src/images/8.png', './src/images/8.png'
];

let first_card;
let second_card;
let stop;
var actual_score_value=0;
let firstFlippedCard = null;
let value_timer_text;
let panel_score_text;
let panel_error_text;
let value_score_text;
let value_error_text;
let panel_button_text;
let memory_board;
let game;
let board;
let interval;


//UTILIZZO UN OGGETTO JS
var partita = {
    score: 0,
    errors: 0,
    time:0
};


/////////////////////////// UTILIZZO DEL PROTOTYPE /////////////////////////////

Array.prototype.memory_card_shuffle= function () {
    let i = this.length, j, temp;
    while(i-->0){
        j=Math.floor(Math.random()* (i+1));
        temp = this[j];
        this[j]=this[i];
        this[i]=temp;
    }
};

/////////////////////////// UTILIZZO DEL PROTOTYPE /////////////////////////////


function initBoardGame(){
    partita.score=0;
    partita.errors=0;
    first_card=undefined;
    second_card=undefined;
    partita.time=120;
    clearInterval(interval);
    startTimer();
    game=document.getElementById("game");
    board=document.createElement("div");
    board.setAttribute("class","board");
    board.setAttribute("id","board");
    game.appendChild(board);
    let top_panel=document.createElement("div");
    top_panel.setAttribute("id","title");
    top_panel.setAttribute("class","container");
    let title= document.createElement('h1');
    title.innerText='Memory Patrol';
    top_panel.appendChild(title);
    board.appendChild(top_panel);

    memory_board=document.createElement("div");
    let scores= document.createElement('div');
    memory_board.setAttribute("class","container");
    memory_board.setAttribute("id","memory-board");
    board.appendChild(scores);
    board.appendChild(memory_board);
    console.log(memory_board.getAttribute("id"));
    console.log(board);

    scores.setAttribute('id','scores');
    scores.setAttribute('class','container');

    let panel_score = document.createElement('div');
    panel_score.setAttribute("class","panel");
    let panel_error= document.createElement('div');
    panel_error.setAttribute("class","panel");
    panel_score_text= document.createElement('h1');
    panel_error_text= document.createElement('h1');
    panel_score_text.innerText='Punteggio : ';
    panel_error_text.innerText='Errori : ';
    panel_score.appendChild(panel_score_text);
    panel_error.appendChild(panel_error_text);
    scores.appendChild(panel_score);
    scores.appendChild(panel_error);
    value_score_text= document.createElement('h2');
    value_error_text= document.createElement('h2');
    value_score_text.innerText=partita.score;
    value_error_text.innerText=partita.errors;
    panel_score.appendChild(value_score_text);
    panel_error.appendChild(value_error_text);

    const panel_button = document.createElement('div');
    panel_button.setAttribute("class","panel");
    panel_button_text= document.createElement('h1');
    panel_button_text.innerText='Ricomincia';
    panel_button.addEventListener("click", restart, true);
    panel_button.appendChild(panel_button_text);

    const panel_timer = document.createElement('div');
    panel_timer.setAttribute("class","panel");
    const panel_timer_text = document.createElement('h1');
    panel_timer_text.innerText='Timer :';
    panel_timer.appendChild(panel_timer_text);
    value_timer_text= document.createElement('h2');
    value_timer_text.innerText=partita.time;
    panel_timer.appendChild(value_timer_text);
    scores.appendChild(panel_timer);
    scores.appendChild(panel_button);

    //////////////////////////////////// UTILIZZO FUNZIONE PROTOTYPE/////////////////////////////////////////
    memory_array.memory_card_shuffle();
    for(let i = 0; i < memory_array.length; i++){
        let card= document.createElement('div');
        card.setAttribute('id','card'+i);
        console.log(i.toString());
        card.setAttribute('name',i.toString());
        card.addEventListener("click", flip);
        card.addEventListener("mouseenter", myMouseEnter, true);
        card.addEventListener("mouseleave", myMouseLeave, true);
        document.getElementById('memory-board').appendChild(card)
    }

};





function newBoard(){
    game=document.getElementById("game");
    let start_button=document.createElement("div");
    start_button.setAttribute("id","start-button");
    start_button.setAttribute("class","container");
    start_button.setAttribute("style", "margin-top:400px; cursor: pointer;");
    let start_text= document.createElement('h1');
    start_text.innerText='Inizia a Giocare!';
    start_button.appendChild(start_text);

    function startGame() {
        game.removeChild(start_button);
        initBoardGame();
    }

    start_button.addEventListener("click", startGame);
    game.appendChild(start_button);

    //initBoardGame();

    //si mischiano gli elementi dell'array con la funzione aggiunta al prototype dell'array memory_card_shuffle
    //viene creato un elemento del dom card per ogni elemento dell'array
    // l'indice viene salvato nell'attributo name della carta
    //si aggiunge l'vento flip ad ogni carta
    //ogni elemento viene poi appeso al tavolo da gioco



}


function myMouseEnter() {
    this.setAttribute("style", "background-color: #E8B400;");
}


function myMouseLeave() {
    this.setAttribute("style", "background-color: #FFD02A;");
}

//////////////////////////////////// FUNZIONE FLIP CARDS ///////////////////////////////////////////////////
function flip() {
    console.log('flip() if stop');
    if(stop== undefined){
        if (first_card == undefined) {
            first_card = this;
            console.log('dentro primo if  flip():' + first_card.getAttribute('name'));
            flip_div_card(first_card);
        } else if (first_card != undefined && second_card == undefined ) {
            if(first_card.id!=this.id) {
                second_card = this;
                console.log('dentro  secondo if flip():' + first_card.getAttribute('name'));
            }
        }
        if (first_card !== undefined && second_card != undefined) {
            console.log('dentro if check first_card !== undefined && second_card != undefined');
            flip_div_card(second_card);
            if (memory_array[first_card.getAttribute('name')] == memory_array[second_card.getAttribute('name')]) {
                ///////////////////////////// rimozione eventi sulle card ////////////////////////////
                console.log('-------------------qui rimozione eventi se le carte sono uguali:'+second_card.id);
                removeEvents(first_card);
                removeEvents(second_card);
                first_card.setAttribute("style", "background-color: green;");
                second_card.setAttribute("style", "background-color: green;transform: rotateY(360deg); transition: transform 0.8s; transform-style: preserve-3d;");
                firstFlippedCard = null;
                first_card = undefined;
                second_card = undefined;
                stop=undefined;
                actual_score_value = ++actual_score_value;
                partita.score = ++partita.score;
                value_score_text.innerText=partita.score;
                console.log('score:' + actual_score_value);
                console.log('partita score:' + partita.score);
                if(partita.score==8){
                    endGame();
                }
            } else {
                console.log('primo valore:' + first_card.getAttribute('name'));
                console.log('secondo valore:' + this.getAttribute('name'));
                ///////////////////////////////////////////// ARROW FUNCTION CLOSURE RIPRISTINO CARTE ////////////////////////////////////////////////////
                setTimeout(() => {
                    first_card.removeChild(first_card.lastElementChild);
                    first_card.setAttribute("style", "background-color: #FFD02A;");
                    this.removeChild(second_card.lastElementChild);
                    this.setAttribute("style", "background-color: #FFD02A;");
                    addEvents(first_card);
                    addEvents(this);
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





}

function flip_div_card(current_card) {
    console.log('DENTRO FLIP EFFECT----------------->'+current_card.getAttribute('name'));
    current_card.setAttribute("style", "background-color: orange; transform: rotateY(360deg); transition: transform 0.8s; transform-style: preserve-3d;");
    removeEvents(current_card);
    setTimeout(() => {
            let cardContent = document.createElement('img');
            cardContent.setAttribute("src", memory_array[current_card.getAttribute('name')]);
            current_card.appendChild(cardContent);
            },300);
     if(second_card!=undefined)stop=1;
}

function gameOver(){
    var children = memory_board.children;
    for (var i = 0; i < children.length; i++) {
        children[i].innerHTML='';
        flip_div_card(children[i]);
    }
};
function restart(){
    game.removeChild(board);
    newBoard();
};

function endGame(){
    clearInterval(interval);
}
function startTimer(){
    let distance = 120;
    ///////////////////////////////// Esempio di Funzione anonima e closure/////////////////////////////////
    interval = setInterval(function () {
        partita.time = --distance ;
        value_timer_text.innerText=partita.time + "s";
        console.log('Timer Aggiornamento');
        if (partita.time < 0) {
            clearInterval(interval);
            value_timer_text.innerText = '0s!';
            gameOver();
        }
    }, 1000);
}

function removeEvents(current_card) {
    console.log('REMOVE EVENTS');
    current_card.removeEventListener("mouseenter",myMouseEnter, true);
    current_card.removeEventListener("mouseleave",myMouseLeave, true);
    current_card.removeEventListener("click",flip);
}

function addEvents(current_card) {
    console.log('ADD EVENTS');
    let cardContent = document.createElement('img');
    current_card.addEventListener("mouseenter",myMouseEnter, true);
    current_card.addEventListener("mouseleave",myMouseLeave, true);
    current_card.addEventListener("click",flip);
}
newBoard();

