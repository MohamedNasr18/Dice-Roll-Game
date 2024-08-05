const playerOneRoll = document.querySelector(".P1-roll");
const playerOneEndScore = document.querySelector(".p1-endScore");
const playerTwoRoll = document.querySelector(".P2-roll");
const playerTwoEndScore = document.querySelector(".p2-endScore");
const roll = document.querySelector(".roll");
const hold = document.querySelector(".hold");
const numbers = [1, 2, 3, 4, 5, 6];
const newGame = document.querySelector(".newGame");
const dice = document.querySelector(".dice");

const diceFaces = {
    1: 'images/dice-1.png',
    2: 'images/dice-2.png',
    3: 'images/dice-3.png',
    4: 'images/dice-4.png',
    5: 'images/dice-5.png',
    6: 'images/dice-6.png'
};

let playerOneScore = 0; 
let playerTwoScore = 0; 
let playerOneTotalScore = 0; 
let playerTwoTotalScore = 0; 
let activePlayer = 1; 
updateActivePlayerHighlight();

// Function to update player highlight
function updateActivePlayerHighlight() {
    document.querySelector(".player1-container").classList.remove("active-player");
    document.querySelector(".player2-container").classList.remove("active-player");
    
    if (activePlayer === 1) {
        document.querySelector(".player1-container").classList.add("active-player");
    } else {
        document.querySelector(".player2-container").classList.add("active-player");
    }
}

// Roll button event listener
roll.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let randomNum = numbers[randomIndex];
    updateActivePlayerHighlight();

    // Update dice display
    dice.style.visibility = "visible";
    dice.innerHTML = ""; // Clear previous content

    // Display new roll result with image
    setTimeout(() => {
        dice.innerHTML = `<img src="${diceFaces[randomNum]}" alt="Dice face showing ${randomNum}">`;
    }, 100);

    if (randomNum === 1) {
        if (activePlayer === 1) {
            playerOneScore = 0;
            playerOneRoll.innerHTML = playerOneScore;
        } else {
            playerTwoScore = 0;
            playerTwoRoll.innerHTML = playerTwoScore;
        }
        
        holdGame();
    } else {
        if (activePlayer === 1) {
            playerOneScore += randomNum;
            playerOneRoll.innerHTML = playerOneScore;
        } else {
            playerTwoScore += randomNum;
            playerTwoRoll.innerHTML = playerTwoScore;
        }
    }
});

// Hold button event listener
hold.addEventListener("click", holdGame);

// Function to handle hold
function holdGame() {
    dice.innerHTML = ""; // Clear dice image
    if (activePlayer === 1) {
        playerOneTotalScore += playerOneScore;
        playerOneEndScore.innerHTML = playerOneTotalScore;
        playerOneScore = 0;
        playerOneRoll.innerHTML = 0;

        if (playerOneTotalScore >= 50) {
            setTimeout(() => {
                alert("Player 1 wins with a score of " + playerOneTotalScore + "!");
                resetGame();
            }, 100); 
            return;
        }
    } else {
        playerTwoTotalScore += playerTwoScore;
        playerTwoEndScore.innerHTML = playerTwoTotalScore;
        playerTwoScore = 0;
        playerTwoRoll.innerHTML = 0;

        if (playerTwoTotalScore >= 50) {
            setTimeout(() => {
                alert("Player 2 wins with a score of " + playerTwoTotalScore + "!");
                resetGame();
            }, 100); 
            return;
        }
    }

    // Switch active player
    activePlayer = activePlayer === 1 ? 2 : 1;
    
    // Update player highlight
    updateActivePlayerHighlight();
}

// New Game button event listener
newGame.addEventListener("click", () => {
    dice.style.visibility = "hidden";
    dice.innerHTML = ""; // Clear dice image
    resetGame();
});

// Function to reset game
function resetGame() {
    playerOneScore = 0;
    playerTwoScore = 0;
    playerOneTotalScore = 0;
    playerTwoTotalScore = 0;
    playerOneRoll.innerHTML = playerOneScore;
    playerTwoRoll.innerHTML = playerTwoScore;
    playerOneEndScore.innerHTML = playerOneTotalScore;
    playerTwoEndScore.innerHTML = playerTwoTotalScore;
    activePlayer = 1;
    
    // Reset player highlight
    updateActivePlayerHighlight();
}
