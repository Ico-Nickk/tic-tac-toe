const player1 = (()=> {
    let tag = "player1";
    let name = "nick";
    let marker = "X";
    let currentScore = 0;
    const setPlayerName = (val)=> {
        name = val;
    };
    const getScore = () => currentScore;
    const addScore = () => { currentScore++;};
    const resetScore = () => currentScore = 0;
    return {name, getScore, addScore, resetScore, setPlayerName, marker, tag, currentScore};
})();

const player2 = (()=> {
    let tag = "player2";
    let name = "judy";
    let marker = "O";
    let currentScore = 0;
    const setPlayerName = (val)=> {
        name = val;
    };
    const getScore = () => currentScore;
    const addScore = () => { currentScore++;};
    const resetScore = () => currentScore = 0;
    return {name, getScore, addScore, resetScore, setPlayerName, marker, tag, currentScore};
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

    function resetGridSquares() {
        for (const [key, value] of Object.entries(gridSquares)) {
            gridSquares[key] = "";
        };
    };

    const addSymbol = (square, player) => {
        gridSquares[square] = player.marker;
    };

    const getGridSquareVal = (square) => gridSquares[square];

    const getBoardSection = (section) => gameGrid[section];
    
    return {addSymbol, getGridSquareVal, getBoardSection, gameGrid, resetGridSquares};
})();

const gameController = {
    rounds: 0,
    roundWinner: "",
    gameWinner: "",
    isRoundWinner: "",
    isPlayerOneTurn: false,
    currentPlayersTurn: player1,

    checkRoundWinner: function(){
        Object.values(gameBoard.gameGrid).forEach(value => {
            switch (value) {
                case "XXX":
                    this.roundWinner = player1;
                    this.updateWinnerScore();
                    console.log("winner is player1");
                    this.isRoundWinner = true;
                    break
                case "OOO":
                    this.roundWinner = player2;
                    console.log("winner is player2");
                    this.updateWinnerScore();
                    this.isRoundWinner = true;
                    break
                default:
            };

        });
    },

    increaseRounds: function(){
        if(this.rounds < 3) {
            this.rounds++;
        };
    },

    updateWinnerScore: function(){
        if (this.roundWinner != "") {
            this.roundWinner.addScore();
        } else {
            console.log("no round winner found");
        };
        this.increaseRounds;
    },

    checkGameWinner: function(){
        if(player1.getScore() > player2.getScore()){
            this.gameWinner = player1;
            console.log(`player1 wins the game! score is ${player1.getScore()} to ${player2.getScore()}`);
        } else if(player2.getScore() > player1.getScore()) {
            this.gameWinner = player2;
            console.log(`player2 wins the game! score is ${player1.getScore()} to ${player2.getScore()}`);
        } else {
            console.log("its a tie");
        };
    },

    changeTurns: function(){
        if(this.isPlayerOneTurn) {
            this.currentPlayersTurn = player1;
            displayController.toggleBanner(displayController.bannerP1);
            displayController.toggleBanner(displayController.bannerP2);
            console.log(`${this.currentPlayersTurn.tag} turn`);
        } else {
            this.currentPlayersTurn = player2
            displayController.toggleBanner(displayController.bannerP2);
            displayController.toggleBanner(displayController.bannerP1);
            console.log(`${this.currentPlayersTurn.tag} turn`);
        }
        this.isPlayerOneTurn = !this.isPlayerOneTurn;
    },

    checkFirstToPlay: function(){
        if(this.roundWinner.tag === "player1"){
            this.currentPlayersTurn = player2;
            console.log(`first to play is ${this.currentPlayersTurn.tag}`);
        } else {
            this.currentPlayersTurn = player1;
            console.log(`first to play is ${this.currentPlayersTurn.tag}`);
        };
    },
    
    endOfRound: function() {
        if(this.isRoundWinner && this.rounds === 3) {
            this.checkGameWinner();
            console.log(`${this.gameWinner.name}`);
        }
    },

    playATurn: function(event){
        gameBoard.addSymbol(event.id, gameController.currentPlayersTurn);
        displayController.placeMarker(event, gameController.currentPlayersTurn);
        this.checkRoundWinner();
        this.showRoundResults();
        this.endOfRound();
        this.changeTurns();
        displayController.updateCurrentPlayersTurn();
        event.disabled = true;
    },

    showRoundResults: function(){
        if(this.roundWinner != ""){
            viewController.showView("round");
        };
    }
};

const displayController = {
    bannerP1: document.getElementById("banner-p1"),
    bannerP2: document.getElementById("banner-p2"),
    roundCounter: document.querySelector(".roundCounter"),
    currentPlayersTurn: document.querySelector(".currentTurn"),
    toggleBanner: function(banner) {
        if(banner.classList.contains("active")){
            banner.classList.replace("active", "inactive");
        } else {
            banner.classList.replace("inactive", "active");
        };
    },

    updateCurrentPlayersTurn: function(){
        this.currentPlayersTurn.textContent = `${gameController.currentPlayersTurn.name} Turn!`;
    },

    updateRoundCounter: function(){
        this.roundCounter.textContent = `Round ${gameController.rounds}`;
    },

    placeMarker: function(square, player){
        square.textContent = player.marker;
        square.classList.add(player.marker);
    },

};

const viewController = {
    views: {
        setup: document.getElementById('setup-view'),
        game: document.getElementById('game-view'),
        round: document.getElementById('round-result-view'),
        final: document.getElementById('final-result-view'),
    },
    showView: function(viewName){
        Object.values(this.views).forEach(v => v.classList.remove('active'));
        this.views[viewName].classList.add('active');
    }
};

const gameGrid = {
    a1: document.querySelector("#a1"),
    b1: document.querySelector("#b1"),
    c1: document.querySelector("#c1"),
    a2: document.querySelector("#a2"),
    b2: document.querySelector("#b2"),
    c2: document.querySelector("#c2"),
    a3: document.querySelector("#a3"),
    b3: document.querySelector("#b3"),
    c3: document.querySelector("#c3"),
};

const gameGridDisplay = document.querySelector(".game-grid");
gameGridDisplay.addEventListener("click", (event)=> {
    switch (event.target.id) {
        case "a1":
            console.log("a1 pressed");
            gameController.playATurn(event.target);
            break;

        case "b1":
            console.log("b1 pressed");
            gameController.playATurn(event.target);
            break;
        case "c1":
            console.log("c1 pressed");
            gameController.playATurn(event.target);
            break;
            
        case "a2":
            console.log("a2 pressed");
            gameController.playATurn(event.target);
            break;

        case "b2":
            console.log("b2 pressed");
            gameController.playATurn(event.target);
            break;
            
        case "c2":
            console.log("c2 pressed");
            gameController.playATurn(event.target);
            break;
            
        case "a3":
            console.log("a3 pressed");
            gameController.playATurn(event.target);
            break;
            
        case "b3":
            console.log("b3 pressed");
            gameController.playATurn(event.target);
            break;
            
        case "c3":
            console.log("c3 pressed");
            gameController.playATurn(event.target);
            break;

        default:
    };
});

const roundResultController = {
    winnerBanner: document.querySelector(".winnerBanner"),

    endOfCurrentRound: document.querySelector(".currentRound"),

    player1Name: document.querySelector(".player1 .player-name"),

    player2Name: document.querySelector(".player2 .player-name"),

    player1Score: document.querySelector(".player1 .score-num"),

    player2Score: document.querySelector(".player2 .score-num"),


    updateEndOfCurrentRound: function(round){
        this.endOfCurrentRound.textContent = `Round ${round} complete`;
    },
    updateRoundResultBanner: function(winner){
        this.winnerBanner.childNodes[0].nodeValue = `${winner} `;
    },
    updateRoundResultName: function(element, Name){
        roundResultController[element].textContent = Name;
    },
    updateRoundResultScore: function(element, score){
        roundResultController[element].textContent = score;
    },

    updateResultView: function() {
        this.updateEndOfCurrentRound(gameController.rounds);
        this.updateRoundResultBanner(gameController.roundWinner);
        this.updateRoundResultName("player1Name", player1.name);
        this.updateRoundResultName("player2Name", player2.name);
        this.updateRoundResultScore("player1Score", player1.currentScore);
        this.updateRoundResultScore("player2Score", player2.currentScore);
    }
}

