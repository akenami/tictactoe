// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//game constants
const xSymbol = 'x';
const oSymbol = 'o';


// game variables
let gameIsLive = true;
let xisnext = true;

//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
        if (letter === 'x') {
            statusDiv.innerHTML = `${letterToSymbol(letter)} has won`
        } else {statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won</span>`;}
};
    
const checkGameStatus = () => {
    const topleft = cellDivs[0].classList[1];
    const topmiddle = cellDivs[1].classList[1];
    const topright = cellDivs[2].classList[1];
    const middleleft = cellDivs[3].classList[1];
    const middlemiddle = cellDivs[4].classList[1];
    const middleright = cellDivs[5].classList[1];
    const bottomleft = cellDivs[6].classList[1];
    const bottommiddle = cellDivs[7].classList[1];
    const bottomright = cellDivs[8].classList[1];

    //check winner
    if (topleft && topleft === topmiddle && topleft === topright) {
        handleWin(topleft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    } else if (middleleft && middleleft === middlemiddle && middleleft === middleright) {
        handleWin(middleleft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    } else if (bottomleft && bottomleft === bottommiddle && bottomleft === bottomright) {
        handleWin(bottomleft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    } else if (topleft && topleft === middleleft && topleft === bottomleft) {
        handleWin(topleft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    } else if (topmiddle && topmiddle === middlemiddle && topmiddle === bottommiddle) {
        handleWin(topmiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    } else if (topright && topright === middleright && topright === bottomright) {
        handleWin(topright);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    } else if (topleft && topleft === middlemiddle && topleft === bottomright) {
        handleWin(topleft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    } else if (topright && topright === middlemiddle && topright === bottomleft) {
        handleWin(topright);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    } else if (topleft && topmiddle && topright && middleleft && middlemiddle && middleright && bottomleft && bottommiddle && bottomright) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    } else {
        xisnext = !xisnext;
        if (xisnext) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};


//event handlers
const handleReset = () => {
    xisnext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    gameIsLive = true;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    if (xisnext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
};


//event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}