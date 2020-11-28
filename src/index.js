import './styles/main.scss';

//Progetto Memory Patrol
//Inizializzazione delle variabili e delle costanti
//si mischiano gli elementi dell'array con la funzione aggiunta al prototype dell'array memory_card_shuffle
//viene creato un elemento del dom card per ogni elemento dell'array
// l'indice della carta viene salvato nell'attributo name della carta
//si aggiunge l'vento flip ad ogni carta
//ogni elemento viene poi appeso al tavolo da gioco
//Un timer scandisce le partite
//vengono utilizzate due variabili (come una specie semafori) per controllare lo stato delle flipped card per inibire gli eventi di flip
//se il timer scade vengono flippate tutte le card, si ferma il timer e si rimuovono gli eventi dalle card
// il CSS base è stato creato nel file .scss mentre i cambiamenti dinamici dello stile degli elementi sono gestiti tramite la funzione setAttribute() di Javascript

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


let actual_score_value = 0;
let firstFlippedCard = null;
let interval;


///////////////////// Function Constructor
function Partita(){
    this.score= 0;
    this.errors= 0;
    this.time= '---';
    this.first_card=undefined;
    this.second_card=undefined;
    this.stop=undefined;

    this.setScore=function(score){
        this.score=score;
    };

    this.setErrors=function(errors){
        this.errors=errors;
    };

    this.setTime=function(time){
        this.time=time;
    };

    this.setFirstCard=function(firstCard){
        this.first_card=firstCard;
    };
    this.setSecondCard=function(secondCard){
        this.second_card=secondCard;
    };
    this.setStop=function(stop){
        this.stop=stop;
    };

    this.getScore=function(){
        return this.score;
    };

    this.getErrors=function(){
        return this.errors;
    };

    this.getTime=function(){
        return this.time;
    };

    this.getFirstCard=function(){
        return this.first_card;
    };

    this.getSecondCard=function(){
        return this.second_card;
    };
    this.getStop=function(){
        return this.stop;
    };

    this.newCardDeck=function(){
        memory_array.memory_card_shuffle();
        for(let i = 0; i < memory_array.length; i++){
            let card = document.createElement('div');
            card.setAttribute('id','card'+i);
            console.log(i.toString());
            card.setAttribute('name',i.toString());
            card.addEventListener("click", flip);
            card.addEventListener("mouseenter", myMouseEnter, true);
            card.addEventListener("mouseleave", myMouseLeave, true);
            document.getElementById('memory-board').appendChild(card)
        }
    }
};

let currentGame;

function ViewComponent(){

    this.game = document.getElementById("game");
    this.board = document.createElement("div");
    this.top_panel = document.createElement("div");
    this.title = document.createElement('h1');
    this.memory_board=document.createElement("div");
    this.scores=document.createElement('div');
    this.panel_score= document.createElement('div');
    this.panel_error= document.createElement('div');
    this.panel_score_text= document.createElement('h1');
    this.value_score_text= document.createElement('h2');
    this.value_error_text= document.createElement('h2');
    this.panel_button = document.createElement('div');
    this.panel_button_text= document.createElement('h1');
    this. panel_timer = document.createElement('div');
    this.value_timer_text= document.createElement('h2');
    this.panel_error_text= document.createElement('h1');
    this. panel_timer_text = document.createElement('h1');


    this.build = function() {
        this.board.setAttribute("class","board");
        this.board.setAttribute("id","board");
        this.game.appendChild(this.board);
        this.top_panel.setAttribute("id","title");
        this.top_panel.setAttribute("class","container");
        this.title.innerText='Memory Patrol';
        this.top_panel.appendChild(this.title);
        this.board.appendChild(this.top_panel);
        this.memory_board.setAttribute("class","container");
        this.memory_board.setAttribute("id","memory-board");
        this.board.appendChild(this.scores);
        this.board.appendChild(this.memory_board);
        this.scores.setAttribute('id','scores');
        this.scores.setAttribute('class','container');
        this.panel_score.setAttribute("class","panel");
        this.panel_error.setAttribute("class","panel");
        this.panel_score_text.innerText='Punteggio : ';
        this.panel_error_text.innerText='Errori : ';
        this.panel_score.appendChild(this.panel_score_text);
        this.panel_error.appendChild(this.panel_error_text);
        this.scores.appendChild(this.panel_score);
        this.scores.appendChild(this.panel_error);
        this.value_score_text.innerText=currentGame.getScore();
        this.value_error_text.innerText=currentGame.getErrors();
        this.panel_score.appendChild(this.value_score_text);
        this.panel_error.appendChild(this.value_error_text);
        this.panel_button.setAttribute("class","panel");
        this.panel_button_text.innerText='Ricomincia';
        this.panel_button.addEventListener("click", restart, true);
        this.panel_button.appendChild(this.panel_button_text);
        this.panel_timer.setAttribute("class","panel");
        this.panel_timer_text.innerText='Timer :';
        this.panel_timer.appendChild(this.panel_timer_text);
        this.value_timer_text.innerText=currentGame.getTime();
        this.panel_timer.appendChild(this.value_timer_text);
        this.scores.appendChild(this.panel_timer);
        this.scores.appendChild(this.panel_button);

    }
}

let viewComponent=new ViewComponent();

/////////////////////////// Implementazione di una nuova funzione  del prototype Array /////////////////////////////
//aggiungo una funzione al prototype dell'array per mischiare gli elementi dell'array
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
    /////////////reset Variabili
    currentGame=new Partita();
    viewComponent.build();
    currentGame.newCardDeck();
    clearInterval(interval);
    startTimer();
};

function newBoard(){
    ////////////////////Creazione dinamica del bottone per iniziare la partita e aggiunta dell'evento
    viewComponent.game=document.getElementById("game");
    let start_button=document.createElement("div");
    start_button.setAttribute("id","start-button");
    start_button.setAttribute("class","container");
    start_button.setAttribute("style", "margin-top:400px; cursor: pointer;");
    let start_text= document.createElement('h1');
    start_text.innerText='Inizia a Giocare!';
    start_button.appendChild(start_text);
    ////////////////CLOSURE/////////////////
    function startGame() {
        //rimozione del pulsante e chiamata alla funzione di inizializzazione del tavolo da gioco
        viewComponent.game.removeChild(start_button);
        initBoardGame();
    }
    start_button.addEventListener("click", startGame);
    viewComponent.game.appendChild(start_button);
}

function myMouseEnter() {
    this.setAttribute("style", "background-color: #E8B400;");
}

function myMouseLeave() {
    this.setAttribute("style", "background-color: #FFD02A;");
}


//////////////////////////////////// FUNZIONE FLIP CARDS ///////////////////////////////////////////////////
// La funzione flip() gestisce la logica del flip delle carte
function flip() {
    console.log('flip() if stop');
    console.log('valore stop'+currentGame.getStop());
    if(currentGame.getStop() === undefined){
        if (currentGame.getFirstCard() === undefined) {
            currentGame.setFirstCard(this);
            console.log('dentro primo if  flip():' + currentGame.getFirstCard().getAttribute('name'));
            flip_div_card(currentGame.getFirstCard());
        } else if (currentGame.getFirstCard() !== undefined && currentGame.getSecondCard() === undefined ) {
            if(currentGame.getFirstCard().id !== this.id) {
                currentGame.setSecondCard(this);
                console.log('dentro  secondo if flip():' + currentGame.getFirstCard().getAttribute('name'));
            }
        }
        if (currentGame.getFirstCard() !== undefined && currentGame.getSecondCard() !== undefined) {
            console.log('dentro if check currentGame.getFirstCard() !== undefined && currentGame.getSecondCard() != undefined');
            flip_div_card(currentGame.getSecondCard());
            if (memory_array[currentGame.getFirstCard().getAttribute('name')] == memory_array[currentGame.getSecondCard().getAttribute('name')]) {
                ///////////////////////////// rimozione eventi sulle card ////////////////////////////
                console.log('Rimozione eventi se le carte sono uguali:'+currentGame.getSecondCard().id);
                removeEvents(currentGame.getFirstCard());
                removeEvents(currentGame.getSecondCard());
                currentGame.getFirstCard().setAttribute("style", "background-color: green;");
                currentGame.getSecondCard().setAttribute("style", "background-color: green;transform: rotateY(360deg); transition: transform 0.8s; transform-style: preserve-3d;");
                firstFlippedCard = null;
                currentGame.setFirstCard(undefined);
                currentGame.setSecondCard(undefined);
                currentGame.setStop(undefined);
                actual_score_value = ++actual_score_value;
                currentGame.setScore(++currentGame.score);
                //partita.score = ++partita.score;
                viewComponent.value_score_text.innerText=currentGame.getScore();
                console.log('score:' + actual_score_value);
                console.log('partita score:' + currentGame.score);
                if(currentGame.score==8){
                    endGame();
                }
            } else {
                console.log('primo valore:' + currentGame.getFirstCard().getAttribute('name'));
                console.log('secondo valore:' + this.getAttribute('name'));
                ///////////////////////////////////////////// ARROW FUNCTION CLOSURE RIPRISTINO CARTE ////////////////////////////////////////////////////
                setTimeout(() => {
                    currentGame.getFirstCard().removeChild(currentGame.getFirstCard().lastElementChild);
                    currentGame.getFirstCard().setAttribute("style", "background-color: #FFD02A;");
                    this.removeChild(currentGame.getSecondCard().lastElementChild);
                    this.setAttribute("style", "background-color: #FFD02A;");
                    addEvents(currentGame.getFirstCard());
                    addEvents(this);
                    //firstFlippedCard = null;
                    currentGame.setFirstCard(undefined);
                    currentGame.setSecondCard(undefined);
                    currentGame.setStop(undefined);
                    currentGame.setErrors(++currentGame.errors);
                    //partita.errors=++partita.errors;
                    viewComponent.value_error_text.innerText=currentGame.getErrors();
                    console.log('errori:'+ currentGame.getErrors())
                }, 1000);
            }

        }
    }
}

///////////La funzione flip_div_card() gestisce lo stile e la rimozione dell'evento durante il flip della card
function flip_div_card(current_card) {
    console.log('DENTRO FLIP EFFECT----------------->'+current_card.getAttribute('name'));
    current_card.setAttribute("style", "background-color: orange; transform: rotateY(360deg); transition: transform 0.8s; transform-style: preserve-3d;");
    removeEvents(current_card);
    setTimeout(() => {
            let cardContent = document.createElement('img');
            cardContent.setAttribute("src", memory_array[current_card.getAttribute('name')]);
            current_card.appendChild(cardContent);
            },300);
     if(currentGame.getSecondCard()!=undefined) currentGame.setStop(1);
}

function gameOver(){
    var children = viewComponent.memory_board.children;
    for (var i = 0; i < children.length; i++) {
        children[i].innerHTML='';
        flip_div_card(children[i]);
    }
};


function restart(){
    viewComponent.game.removeChild(viewComponent.board);
    newBoard();
};

function endGame(){
    clearInterval(interval);
}

function startTimer(){
    let distance = 120;
    ///////////////////////////////// Esempio di Funzione anonima e closure/////////////////////////////////
    interval = setInterval(function () {
        currentGame.setTime(--distance);
        //partita.time = --distance ;
        viewComponent.value_timer_text.innerText=currentGame.getTime() + "s";
        //console.log('Timer Aggiornamento'+partita.time + "s");
        if (currentGame.getTime() < 0) {
            clearInterval(interval);
            viewComponent.value_timer_text.innerText = '0s!';
            gameOver();
        }
    }, 1000);
}

///////////////////// le seguenti funzioni
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

