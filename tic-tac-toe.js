const player1 = (()=> {
    let name;
    const setPlayerName = (val)=> {
        name = val;
    };
    const getName = () => name;
    let currentScore = 0;
    let playerSymbol = "";
    const getScore = () => currentScore;
    const addScore = () => { currentScore++;};
    const resetScore = () => currentScore = 0;
    const setSymbol = (Symbol) => {playerSymbol = Symbol;};
    const getSymbol = () => playerSymbol;
    return {name, getScore, addScore, resetScore, setSymbol, getSymbol, setPlayerName, getName};
})();

const player2 = (()=> {
    let name;
    const setPlayerName = (val)=> {
        name = val;
    };
    const getName = () => name;
    const setName = (val) => {name = val};
    let currentScore = 0;
    let playerSymbol = "";
    const getScore = () => currentScore;
    const addScore = () => { currentScore++;};
    const resetScore = () => currentScore = 0;
    const setSymbol = (Symbol) => {playerSymbol = Symbol;};
    const getSymbol = () => playerSymbol;
    return {name, getScore, addScore, resetScore, setSymbol, getSymbol, setPlayerName, getName};
})();

const gameBoard = (()=>{
    
    let gridSquares = {
        a1: "",
        a2: "",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
    };

    let gameGrid = {
        get colA(){ 
            return `${gridSquares.a1 + gridSquares.a2 + gridSquares.a3}`;
        },

        get colB(){
            return `${gridSquares.b1 + gridSquares.b2 + gridSquares.b3}`;
        },

        get colC(){
            return `${gridSquares.c1 + gridSquares.c2 + gridSquares.c3}`;
        },

        get row1(){
            return `${gridSquares.a1 + gridSquares.b1 + gridSquares.c1}`;
        },

        get row2(){
            return `${gridSquares.a2 + gridSquares.b2 + gridSquares.c2}`;
        },

        get row3(){
            return `${gridSquares.a3 + gridSquares.b3 + gridSquares.c3}`;
        },

        get diagonal1(){
            return `${gridSquares.a3 + gridSquares.b2 + gridSquares.c1}`;
        },

        get diagonal2(){
            return `${gridSquares.a1 + gridSquares.b2 + gridSquares.c3}`;
        },

    };

    let turnsPlayed = 0;

    const getTurnsPlayed = () => turnsPlayed;
    const increaseTurnsPlayed = () => turnsPlayed++;

    const getGridSquareVal = (square) => gridSquares[square];

    const getBoardSection = (section) => gameGrid[section];

    const showGridSquare = () => gridSquares;

    const addSymbol = (square, player) => {
        increaseTurnsPlayed();
        gridSquares[square] = player.getSymbol();
        gameOver();
        console.log("symbol added");
    };

    function updateWinner(value) {
        const winner = document.querySelector(".winner");
        winner.textContent = winner.textContent + " " + value;
    }

    function updateGameLog() {
        const gameStatus = document.querySelector(".status-value");
        gameStatus.textContent = `round ${getRoundsPlayed()}`;
    }
    
    function resetWinner() {
        const winner = document.querySelector(".winner");
        winner.textContent = "winner :";
    }

    function changeStartBttn() {
        gameStart.textContent = "Next round"
    }

    function resetBoard() {
        const gameBoardCells = document.querySelectorAll(".cell");
        for(let cell of gameBoardCells) {
            cell.textContent = " ";
        };
    };

    const winCondition = () => {
        console.log("wincondition is running")
        Object.values(gameGrid).forEach(value => {
            switch (value) {
                case "XXX":
                    if (player1.getSymbol() === value[0]) {
                        console.log(`winner ${player1.getName()}`);
                        updateWinner(player1.getName());
                        player1.addScore();
                        roundsPlayed++;
                        changeStartBttn()
                    } else {
                        console.log(`winner ${player2.getName()}`);
                        updateWinner(player2.getName());
                        player2.addScore;};
                        roundsPlayed++;
                        changeStartBttn()
                    break;
                case "OOO":
                    if (player1.getSymbol() === value[0]) {
                        console.log(`winner ${player1.getName()}`);
                        updateWinner(player1.getName());
                        player1.addScore();
                        roundsPlayed++;
                        changeStartBttn()
                    } else { 
                        console.log(`winner ${player2.getName()}`);
                        updateWinner(player2.getName());
                        player2.addScore();};
                        roundsPlayed++;
                        changeStartBttn()
                    break;
                default:
                    if(getTurnsPlayed() === 8) {
                        updateWinner("its a Tie!");
                        changeStartBttn()
                    };
                    break;
            };

        })
    };
    
    let roundsPlayed = 1;
    const getRoundsPlayed = () => roundsPlayed;

    function roundOver(){
        winCondition();
    };

    let currentPlayer;
    let players = [player1, player2];
    const getCurrentPlayer = () => currentPlayer

    const firstMove = () => {
        const randomNum = Math.floor(Math.random() * 2);
        let player = players[randomNum];
        if (randomNum === 1) {
            isplayerOneTurn = true;
            currentPlayer = player;
            updateStatus();
            updateGameLog();
        } else {
            isplayerOneTurn = false;
            currentPlayer = players[0];
            updateStatus();
            updateGameLog();
        }
        console.log(player.getName());
        console.log(randomNum);
    };
    
    let isplayerOneTurn;
    
    const switchTurns = () => {
        if (isplayerOneTurn) {
            console.log(`${player1.getName()} turn`);
            currentPlayer = player1;
            updateStatus();
        } else {
            console.log(`${player2.getName()} turn`);
            currentPlayer = player2;
            updateStatus();
        };
        isplayerOneTurn = !isplayerOneTurn;
    };
    function updateStatus() {
        const currentPlayersTurn = document.querySelector(".currentPlayersTurn");
        const currentPlayersSymbol = document.querySelector(".playerSymbol");
        currentPlayersSymbol.textContent = gameBoard.getCurrentPlayer().getSymbol();
        currentPlayersTurn.textContent = gameBoard.getCurrentPlayer().getName();
    };
    
    
    return {addSymbol, getGridSquareVal, getBoardSection, showGridSquare, getTurnsPlayed, winCondition, roundOver, switchTurns, firstMove, getCurrentPlayer, resetBoard, resetWinner};
})();



const diplayController =(() => {
    let player1NameInput = document.getElementById("player1Name");
    let player2NameInput = document.getElementById("player2Name");
    const setPlayer1Name = (player) => {
        ;
    };
    
})();

const headerSection = document.querySelector(".player-selection");

function createPlayerTag(name, element, playerNum) {
    const nameTag = document.createElement("p");
    nameTag.classList.add("playerTag");
    nameTag.textContent = `player ${playerNum}: ${name}`;
    element.replaceWith(nameTag);
};

headerSection.addEventListener("submit", function(event){
    if (event.target && event.target.classList.contains("player1Form")) {
        event.preventDefault();
        const form = event.target;
        const inputElement = form.elements.player1Input;
        const inputVal = inputElement.value;
        player1.setPlayerName(inputVal);
        createPlayerTag(inputVal, form, 1);
    };
    if (event.target && event.target.classList.contains("player2Form")) {
        event.preventDefault();
        const form = event.target;
        const inputElement = form.elements.player2Input;
        const inputVal = inputElement.value;
        player2.setPlayerName(inputVal)
        createPlayerTag(inputVal, form, 2);
    };
    
});

headerSection.addEventListener("click", (event) => {
    const player1Xbtn = document.querySelector(".player1X");
    const player1Obtn = document.querySelector(".player1O");
    const player2Xbtn = document.querySelector(".player2X");
    const player2Obtn = document.querySelector(".player2O");
    if(event.target && event.target.matches(".player1X.selectBtn")) {
        console.log("player1X");
        player1.setSymbol("X");
        player1Xbtn.classList.toggle("disabled");
        if (player1Obtn.classList.contains("disabled") != true) {
            player1Obtn.classList.add("disabled");
        }
        
    };
    if(event.target && event.target.matches(".player1O.selectBtn")) {
        console.log("player1O");
        player1.setSymbol("O");
        player1Obtn.classList.toggle("disabled")
        if (player1Xbtn.classList.contains("disabled") != true) {
            player1Xbtn.classList.add("disabled");
        }
    };
    if(event.target && event.target.matches(".player2X.selectBtn")) {
        console.log("player2X");
        player2.setSymbol("X");
        player2Xbtn.classList.toggle("disabled");
        if (player2Obtn.classList.contains("disabled") != true) {
            player2Obtn.classList.add("disabled");
        }
        
    };
    if(event.target && event.target.matches(".player2O.selectBtn")) {
        console.log("player2O");
        player2.setSymbol("O");
        player2Obtn.classList.toggle("disabled")
        if (player2Xbtn.classList.contains("disabled") != true) {
            player2Xbtn.classList.add("disabled");
        }
    };
});

const gameStart = document.querySelector(".startBtn");
gameStart.addEventListener("click", (event) => {
    gameBoard.firstMove();
})

const gameBoardDisplay = document.querySelector(".game-board");
gameBoardDisplay.addEventListener("click", (event)=> {
    switch (event.target.id) {
        case "a1":
            console.log("a1 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;

        case "b1":
            console.log("b1 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();

            break;
        case "c1":
            console.log("c1 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;
            
        case "a2":
            console.log("a2 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;

        case "b2":
            console.log("b2 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;
            
        case "c2":
            console.log("c2 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;
            
        case "a3":
            console.log("a3 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;
            
        case "b3":
            console.log("b3 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;
            
        case "c3":
            console.log("c3 pressed");
            gameBoard.addSymbol(event.target.id, gameBoard.getCurrentPlayer());
            event.target.textContent = gameBoard.getCurrentPlayer().getSymbol();
            console.log(gameBoard.getCurrentPlayer().getSymbol());
            gameBoard.switchTurns();
            break;

        default:
    };
})
