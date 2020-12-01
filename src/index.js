import './styles/main.scss';


//--------------------------------------------------------------------------------------------------------------------//
//                                             Corso Linguaggi Client Side                                            //
//                                                  Master MWT UnivAQ                                                 //
//                                              Studente: Andrea Serafini                                             //
//--------------------------------------------------------------------------------------------------------------------//
//                                                                                                                    //
//  Il progetto consiste nella realizzazione di un gioco di carte memory realizzato interamente in Javascript         //
//  In dettaglio il progetto è stato implementando realizzando 3 constructor function a cui sono stati assegnati      //
//  diversi comportamenti il dataComponent gestisce i dati e di fatto si compoerta come una classe POJO,              //
//  il controlleComponent implementa la logica della gestione degli eventi ed infine il viewComponent si occupa       //
//  della creazione della componente View.                                                                            //
//  L'implementazione sono state usate il più possibile le caratteristiche del linguaggio Javascript viste a lezione. //
//  il CSS base è stato creato nel file .scss mentre i cambiamenti dinamici dello stile degli elementi sono gestiti   //
//  tramite la funzione setAttribute() di Javascript                                                                  //
//--------------------------------------------------------------------------------------------------------------------//



//--------------------------------------------------------------------------------------------------------------------//
//                                                      Variabili                                                     //
//--------------------------------------------------------------------------------------------------------------------//

let currentGame=new dataComponent();
let viewComponent=new ViewComponent();
let controllerComponent=new ControllerComponent();


/////////////////////////// A scopo didattico viene implementata una nuova funzione  del prototype Array /////////////////////////////
//aggiunta una funzione al prototype dell'array per mischiare gli elementi dell'array
Array.prototype.memory_card_shuffle= function () {
    let i = this.length, j, temp;
    while(i-->0){
        j=Math.floor(Math.random()* (i+1));
        temp = this[j];
        this[j]=this[i];
        this[i]=temp;
    }
};
//###########################       Fine  Inizializzazione Variabili          ###########################//


//--------------------------------------------------------------------------------------------------------------------//
//                                      Constructor Function dataComponent                                            //
//--------------------------------------------------------------------------------------------------------------------//

function dataComponent(){
    this.score = 0;
    this.errors = 0;
    this.time= 120;
    this.first_card = undefined;
    this.second_card = undefined;
    this.stop = undefined;

    this.setScore = function(score){
        this.score = score;
    };

    this.setErrors = function(errors){
        this.errors = errors;
    };

    this.setTime = function(time){
        this.time = time;
    };

    this.setFirstCard = function(firstCard){
        this.first_card = firstCard;
    };
    this.setSecondCard = function(secondCard){
        this.second_card = secondCard;
    };
    this.setStop = function(stop){
        this.stop = stop;
    };

    this.getScore = function(){
        return this.score;
    };

    this.getErrors = function(){
        return this.errors;
    };

    this.getTime = function(){
        return this.time;
    };

    this.getFirstCard = function(){
        return this.first_card;
    };

    this.getSecondCard = function(){
        return this.second_card;
    };
    this.getStop = function(){
        return this.stop;
    };

    this.newCardDeck = function(){
        currentGame.memory_array.memory_card_shuffle();
        for(let i = 0; i < currentGame.memory_array.length; i++){
            let card = document.createElement('div');
            card.setAttribute('id','card'+i);
            console.log(i.toString());
            card.setAttribute('name',i.toString());
            card.addEventListener("click", controllerComponent.flip);
            card.addEventListener("mouseenter", controllerComponent.myMouseEnter, true);
            card.addEventListener("mouseleave", controllerComponent.myMouseLeave, true);
            document.getElementById('memory-board').appendChild(card)
        }
    };

    this.memory_array = [
        './src/images/1.png', './src/images/1.png',
        './src/images/2.png', './src/images/2.png',
        './src/images/3.png', './src/images/3.png',
        './src/images/4.png', './src/images/4.png',
        './src/images/5.png', './src/images/5.png',
        './src/images/6.png', './src/images/6.png',
        './src/images/7.png', './src/images/7.png',
        './src/images/8.png', './src/images/8.png'
    ];
};


//--------------------------------------------------------------------------------------------------------------------//
//                                   Constructor Function controllerComponent                                         //
//--------------------------------------------------------------------------------------------------------------------//

function ViewComponent(){
    this.game = document.getElementById("game");
    this.board = document.createElement("div");
    this.top_panel = document.createElement("div");
    this.title = document.createElement('h1');
    this.memory_board = document.createElement("div");
    this.scores = document.createElement('div');
    this.panel_score = document.createElement('div');
    this.panel_error = document.createElement('div');
    this.panel_score_text = document.createElement('h1');
    this.value_score_text = document.createElement('h2');
    this.value_error_text = document.createElement('h2');
    this.panel_button = document.createElement('div');
    this.panel_button_text= document.createElement('h1');
    this. panel_timer = document.createElement('div');
    this.value_timer_text = document.createElement('h2');
    this.panel_error_text = document.createElement('h1');
    this.panel_timer_text = document.createElement('h1');
    this.start_button=document.createElement("div");
    this.start_text= document.createElement('h1');


    this.showBoard = function() {
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
        this.panel_button.addEventListener("click", controllerComponent.restart, true);
        this.panel_button.appendChild(this.panel_button_text);
        this.panel_timer.setAttribute("class","panel");
        this.panel_timer_text.innerText='Timer :';
        this.panel_timer.appendChild(this.panel_timer_text);
        this.value_timer_text.innerText=currentGame.getTime();
        this.panel_timer.appendChild(this.value_timer_text);
        this.scores.appendChild(this.panel_timer);
        this.scores.appendChild(this.panel_button);
    };
    this.showStartButton = function(){
        this.start_button.setAttribute("id","start-button");
        this.start_button.setAttribute("class","container");
        this.start_button.setAttribute("style", "margin-top:400px; cursor: pointer;");
        this.start_text.innerText='Inizia a Giocare!';
        this.start_button.appendChild(this.start_text);
        this.start_button.addEventListener("click", controllerComponent.startGame);
        this.game.appendChild(viewComponent.start_button);
    }
}
//-------------------------- Fine Function Constructor dataComponent ------------------------------//





//--------------------------------------------------------------------------------------------------------------------//
//                                     Constructor Function controllerComponent                                       //
//--------------------------------------------------------------------------------------------------------------------//


function ControllerComponent(){
    //La funzione flip_div_card() gestisce lo stile e la rimozione dell'evento durante il flip della card
    this.flip_div_card= function(current_card){
        console.log('DENTRO FLIP EFFECT----------------->'+current_card.getAttribute('name'));
        current_card.setAttribute("style", "background-color: orange; transform: rotateY(360deg); transition: transform 0.8s; transform-style: preserve-3d;");
        controllerComponent.removeEvents(current_card);
        setTimeout(() => {
            let cardContent = document.createElement('img');
            cardContent.setAttribute("src", currentGame.memory_array[current_card.getAttribute('name')]);
            current_card.appendChild(cardContent);
        },300);
        if(currentGame.getSecondCard() != undefined) currentGame.setStop(1);
    };

    this.myMouseEnter = function() {
        this.setAttribute("style", "background-color: #E8B400;");
    };

    this.myMouseLeave = function () {
        this.setAttribute("style", "background-color: #FFD02A;");
    };
    this.initBoardGame = function (){
        //reset Variabili
        viewComponent.memory_board.innerHTML='';
        viewComponent.game.innerHTML='';
        currentGame=new dataComponent();
        viewComponent.showBoard();
        currentGame.newCardDeck();
        if(this.initBoardGame.interval)clearInterval(this.initBoardGame.interval);
        this.initBoardGame.interval=controllerComponent.startTimer();
    };

    this.startGame = function () {
        controllerComponent.initBoardGame();
    };
    this.startTimer = function(){
        let distance = currentGame.getTime();
        //Esempio di Funzione
        let interval = setInterval(function () {
            currentGame.setTime(--distance);
            viewComponent.value_timer_text.innerText = currentGame.getTime() + "s";
            if (currentGame.getTime() < 0) {
                clearInterval(interval);
                viewComponent.value_timer_text.innerText = '0s!';
                controllerComponent.gameOver();
            }
        }, 1000);
        return interval;
    };

    this.restart = function(){
        viewComponent.game.removeChild(viewComponent.board);
        newBoard();
    };

     this.gameOver = function(){
        var children = viewComponent.memory_board.children;
        for (var i = 0; i < children.length; i++) {
            children[i].innerHTML = '';
            controllerComponent.flip_div_card(children[i]);
        }
    };

    this.removeEvents = function (current_card) {
        console.log('REMOVE EVENTS');
        current_card.removeEventListener("mouseenter",controllerComponent.myMouseEnter, true);
        current_card.removeEventListener("mouseleave",controllerComponent.myMouseLeave, true);
        current_card.removeEventListener("click",controllerComponent.flip);
    };

    this.addEvents = function (current_card) {
        console.log('ADD EVENTS');
        let cardContent = document.createElement('img');
        current_card.addEventListener("mouseenter",controllerComponent.myMouseEnter, true);
        current_card.addEventListener("mouseleave",controllerComponent.myMouseLeave, true);
        current_card.addEventListener("click",controllerComponent.flip);
    };
    this.endGame = function (){
        clearInterval(controllerComponent.initBoardGame.interval);
    };

    // La funzione flip() gestisce la logica del flip delle carte
    this.flip = function () {
        console.log('flip() if stop');
        console.log('valore stop'+currentGame.getStop());
        if(currentGame.getStop() === undefined){
            if (currentGame.getFirstCard() === undefined) {
                currentGame.setFirstCard(this);
                console.log('dentro primo if  flip():' + currentGame.getFirstCard().getAttribute('name'));
                controllerComponent.flip_div_card(currentGame.getFirstCard());
            } else if (currentGame.getFirstCard() !== undefined && currentGame.getSecondCard() === undefined ) {
                if(currentGame.getFirstCard().id !== this.id) {
                    currentGame.setSecondCard(this);
                    console.log('dentro  secondo if flip():' + currentGame.getFirstCard().getAttribute('name'));
                }
            }
            if (currentGame.getFirstCard() !== undefined && currentGame.getSecondCard() !== undefined) {
                console.log('dentro if check currentGame.getFirstCard() !== undefined && currentGame.getSecondCard() != undefined');
                controllerComponent.flip_div_card(currentGame.getSecondCard());
                if (currentGame.memory_array[currentGame.getFirstCard().getAttribute('name')] == currentGame.memory_array[currentGame.getSecondCard().getAttribute('name')]) {
                    //rimozione eventi sulle card
                    console.log('Rimozione eventi se le carte sono uguali:'+currentGame.getSecondCard().id);
                    controllerComponent.removeEvents(currentGame.getFirstCard());
                    controllerComponent.removeEvents(currentGame.getSecondCard());
                    currentGame.getFirstCard().setAttribute("style", "background-color: green;");
                    currentGame.getSecondCard().setAttribute("style", "background-color: green;transform: rotateY(360deg); transition: transform 0.8s; transform-style: preserve-3d;");
                    currentGame.setFirstCard(undefined);
                    currentGame.setSecondCard(undefined);
                    currentGame.setStop(undefined);
                    currentGame.setScore(++currentGame.score);
                    viewComponent.value_score_text.innerText = currentGame.getScore();
                    console.log('partita score:' + currentGame.score);
                    if(currentGame.score == 8){
                        controllerComponent.endGame();
                    }
                } else {
                    console.log('primo valore:' + currentGame.getFirstCard().getAttribute('name'));
                    console.log('secondo valore:' + this.getAttribute('name'));
                    //ARROW FUNCTION PER RIPRISTINO CARTE
                    setTimeout(() => {
                        currentGame.getFirstCard().removeChild(currentGame.getFirstCard().lastElementChild);
                        currentGame.getFirstCard().setAttribute("style", "background-color: #FFD02A;");
                        this.removeChild(currentGame.getSecondCard().lastElementChild);
                        this.setAttribute("style", "background-color: #FFD02A;");
                        controllerComponent.addEvents(currentGame.getFirstCard());
                        controllerComponent.addEvents(this);
                        currentGame.setFirstCard(undefined);
                        currentGame.setSecondCard(undefined);
                        currentGame.setStop(undefined);
                        currentGame.setErrors(++currentGame.errors);
                        viewComponent.value_error_text.innerText = currentGame.getErrors();
                        console.log('errori:'+ currentGame.getErrors())
                    }, 1000);
                }

            }
        }
    }
}
//########################### Fine Function Constructor controllerComponent  ###########################//


//--------------------------------------------------------------------------------------------------------------------//
//                                                Funzione newBoard                                                   //
//--------------------------------------------------------------------------------------------------------------------//

function newBoard(){
    ////////////////////Creazione dinamica del bottone per iniziare la partita
    viewComponent.showStartButton();
}
newBoard();

