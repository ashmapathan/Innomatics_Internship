const gameBoard = document.getElementById("game-board");
const scoreBoard = document.getElementById("score-board");
const timerDisplay = document.getElementById("timer-display");
const categoryButtons = document.querySelectorAll(".category-btn");
const resultDisplay = document.getElementById("game-result");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timeRemaining = 30;
let timerInterval;
let gameStarted = false;

const images = {
    things: ["🔑", "🎸", "📱", "💡", "📷", "🎤", "🎯", "🖊"],
    fruits: ["🍎", "🍌", "🍇", "🍉", "🍍", "🥭", "🍊", "🍒"],
    animals: ["🐶", "🐱", "🐼", "🦁", "🐯", "🐵", "🐘", "🦉"],
    emojis: ["😀", "😂", "😍", "😭", "😎", "🥰", "😡", "😴"],
};

// Sound effects using Web Audio API
function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
        case "click":
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            break;
        case "match":
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            break;
        case "win":
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
            break;
        case "lose":
            oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
            break;
    }
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Start the game automatically with the default category
document.addEventListener("DOMContentLoaded", () => {
    startGame("things");
});

// Handle category selection
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        startGame(button.dataset.category);
    });
});

function startGame(category) {
    gameBoard.innerHTML = "";
    resultDisplay.textContent = "";
    resultDisplay.style.display = "none";
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    score = 0;
    updateScore(0);
    timeRemaining = 30;
    clearInterval(timerInterval);
    gameStarted = true;
    startTimer();

    let items = [...images[category], ...images[category]];
    items.sort(() => Math.random() - 0.5);

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = item;
        card.innerHTML = `
            <div class="card-front">${item}</div>
            <div class="card-back"></div>
        `;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (!gameStarted || lockBoard || this === firstCard) return;
    playSound("click");
    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        playSound("match");
        disableCards();
        if (timeRemaining > 0) {
            updateScore(score + 1);
        }
        if (score === 8) {
            clearInterval(timerInterval);
            gameOver();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function updateScore(newScore) {
    score = newScore;
    scoreBoard.textContent = `Score: ${score}`;
}

function startTimer() {
    timerDisplay.textContent = `Time: ${timeRemaining}s`;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    lockBoard = true;
    gameBoard.style.position = "relative";
    if (score === 8) {
        playSound("win");
        resultDisplay.textContent = "🎉 You Win! 🎉";
    } else {
        playSound("lose");
        resultDisplay.textContent = " 😢 You Lose! 😢";
    }
    resultDisplay.style.display = "flex";
}
