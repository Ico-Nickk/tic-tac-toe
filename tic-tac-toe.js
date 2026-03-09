const player1 = (()=> {
    let name = "";
    const setName = (val) => {name = val};
    let currentScore = 0;
    let playerSymbol = "";
    const getScore = () => currentScore;
    const addScore = () => { currentScore++;};
    const resetScore = () => currentScore = 0;
    const setSymbol = (Symbol) => {playerSymbol = Symbol;};
    const getSymbol = () => playerSymbol;
    return {name, getScore, addScore, resetScore, setSymbol, getSymbol, setName};
})();

const player2 = (()=> {
    let name = "";
    const setName = (val) => {name = val};
    let currentScore = 0;
    let playerSymbol = "";
    const getScore = () => currentScore;
    const addScore = () => { currentScore++;};
    const resetScore = () => currentScore = 0;
    const setSymbol = (Symbol) => {playerSymbol = Symbol;};
    const getSymbol = () => playerSymbol;
    return {name, getScore, addScore, resetScore, setSymbol, getSymbol, setName};
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
    };

    const winCondition = () => {
        Object.values(gameGrid).forEach(value => {
            switch (value) {
                case "xxx":
                    if (player1.getSymbol() === value[0]) {
                        console.log(`winner ${player1.name}`);
                        player1.addScore();
                    } else {
                        console.log(`winner ${player2.name}`);
                        player2.addScore;};
                    break;
                case "ooo":
                    if (player1.getSymbol() === value[0]) {
                        console.log(`winner ${player1.name}`);
                        player1.addScore();
                    } else { 
                        console.log(`winner ${player2.name}`);
                        player2.addScore();};
                    break;
                default:
                    break;
            };

        })
    };
    
    let gamesPlayed = 0;
    const getGamesPlayed = () => gamesPlayed;
    function gameOver(){
        if (getTurnsPlayed() === 7) {
            winCondition();
            gamesPlayed++
        };
    };
    
    return {addSymbol, getGridSquareVal, getBoardSection, showGridSquare, getTurnsPlayed, winCondition, gameOver, getGamesPlayed};
})();



/*const diplayController =(() => {
    let player1NameInput = document.getElementById("player1Name");
    let player2NameInput = document.getElementById("player2Name");
    const setPlayer1Name = (player) => {
        ;
    };
    
})();


const headerSection = document.querySelector(".player-selection");
headerSection.addEventListener("click", function(event){
    if (event.target && event.target.id === "player1Name") {
        const inputVal = event.target.value;
        player1.setName(inputVal);
    };
});*/