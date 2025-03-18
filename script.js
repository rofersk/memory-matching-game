let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;

const images = [
    "images/chukka1.jpg", "images/chukka2.jpg",
    "images/derby1.jpg", "images/derby2.jpg",
    "images/loafers1.jpg", "images/loafers2.jpg"
];

function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear board for a new game

    let values = [];
    for (let i = 0; i < images.length; i++) {
        values.push(i, i); // Create pairs
    }
    values.sort(() => Math.random() - 0.5); // Shuffle cards

    values.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.style.backgroundImage = "url('images/back.jpg')"; // Default back image
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    attempts = 0;
    document.getElementById('attempts').innerText = "Attempts: 0";

    // Reset game state
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    let cardIndex = parseInt(this.dataset.value, 10);
    this.style.backgroundImage = `url('${images[cardIndex]}')`;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    attempts++;
    document.getElementById('attempts').innerText = "Attempts: " + attempts;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        setTimeout(() => {
            firstCard.style.opacity = "0.5"; // Optional: Fade effect
            secondCard.style.opacity = "0.5";
            resetBoard();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.style.backgroundImage = "url('images/back.jpg')";
            secondCard.style.backgroundImage = "url('images/back.jpg')";
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
