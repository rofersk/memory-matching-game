let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;

const images = [
    "images/chukka1.jpg", "images/chukka2.jpg",
    "images/derby1.jpg", "images/derby2.jpg",
    "images/loafers1.jpg", "images/loafers2.jpg"
];

document.addEventListener("DOMContentLoaded", startGame);

function startGame() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    const values = [...Array(images.length).keys(), ...Array(images.length).keys()]
        .sort(() => Math.random() - 0.5);
    
    values.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });

    attempts = 0;
    updateAttempts();
    resetBoard();
}

function createCard(value) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.style.backgroundImage = "url('images/back.jpg')";
    card.addEventListener("click", flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this.classList.contains("flipped")) return;

    this.style.backgroundImage = `url('${images[this.dataset.value]}')`;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    attempts++;
    updateAttempts();

    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    setTimeout(() => {
        isMatch ? disableCards() : unflipCards();
    }, isMatch ? 500 : 1000);
}

function disableCards() {
    firstCard.style.opacity = "0.5";
    secondCard.style.opacity = "0.5";
    resetBoard();
}

function unflipCards() {
    [firstCard, secondCard].forEach(card => {
        card.style.backgroundImage = "url('images/back.jpg')";
        card.classList.remove("flipped");
    });
    resetBoard();
}

function updateAttempts() {
    document.getElementById("attempts").innerText = `Attempts: ${attempts}`;
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
