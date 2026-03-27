const grid = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const resetBtn = document.getElementById('resetBtn');

const cardValues = ['Y','Y','G','G','B','B','R','R','O','O','P','P','C','C','M','M'];
let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffledCards = shuffle([...cardValues]);
    grid.innerHTML = '';
    score = 0;
    scoreEl.textContent = score;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card', value);
        card.dataset.value = value;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const front = document.createElement('div');
        front.classList.add('card-front');

        const back = document.createElement('div');
        back.classList.add('card-back');
        back.textContent = value;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);
        grid.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flipped');

    if(!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if(isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score++;
        scoreEl.textContent = score;
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

resetBtn.addEventListener('click', createBoard);

createBoard();
