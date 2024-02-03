const cards = [
  { value: 25 },
  { value: 25 },
  // { value: 50 },
  // { value: 100 },
  // { value: 100 },
  // { value: 200 },
  // { value: 0 },
  // { value: 0 },
  // { value: 0 },
  // { value: 0 },
  // { value: 0 },
  // { value: 0 }
];

let selectedCards = [];
let totalScore = 0;

const gameContainer = document.getElementById('game-container');
const progressBar = document.getElementById('progress-bar');
const progressCount = document.getElementById('progress-count');
const progressFill = document.getElementById('progress-fill');
const newGameBtn = document.getElementById('new-game-btn');

// Shuffle cards
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// Initialize game
function initGame() {
  newGameBtn.classList.add('hidden');
  gameContainer.innerHTML = '';
  progressCount.innerText = '';
  totalScore = 0;
  selectedCards = [];
  progressFill.style.width = '0';
  renderCards();
  shuffleCards();
  console.log(cards);
}

// Render cards on the page
function renderCards() {
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.addEventListener('mousemove', handleCardClick);

    // const cardImageTop = document.createElement('img');
    // cardImageTop.classList.add('top');
    // cardImageTop.src = 'scratch.png';

    // const cardImageTop = document.createElement('div');
    // cardImageTop.classList.add('top');


    // const cardImageBottom = document.createElement('img');
    // cardImageBottom.classList.add('bottom');

    // cardElement.appendChild(cardImageTop);

    // cardElement.appendChild(cardImageBottom);
    gameContainer.appendChild(cardElement);
  })
}

// Handle card click event
function handleCardClick(event) {
  const clickedIndex = event.currentTarget.dataset.index;

  if (selectedCards.length < 6 && !selectedCards.includes(clickedIndex)) {
    revealCard(event, clickedIndex);
    updateScore(cards[clickedIndex].value);
    checkGameEnd();
  }
}

// Reveal card
function revealCard(event, index) {
  const cardElement = gameContainer.children[index];
  // cardElement.removeChild(cardElement.firstChild);
  const eraser = document.createElement('div');
  console.log(eraser);
  if (cards[index].value == 25) {
    eraser.style.backgroundImage = 'url("25.png")';
  } else if (cards[index].value == 50) {
    eraser.style.backgroundImage = 'url("50.png")';
  } else if (cards[index].value == 100) {
    eraser.style.backgroundImage = 'url("100.png")';
  } else if (cards[index].value == 200) {
    eraser.style.backgroundImage = 'url("200.png")';
  } else {
    eraser.style.backgroundImage = 'url("empty.png")';
  }
  eraser.classList.add('bottom');
  eraser.style.left = -25 + event.offsetX + 'px';
  eraser.style.top = -25 + event.offsetY + 'px';
  cardElement.appendChild(eraser);
  // cardElement.appendChild(eraser);
  // if (cards[index].value == 25) {
  //   cardElement.children[1].src = '25.png';
  // } else if (cards[index].value == 50) {
  //   cardElement.children[1].src = '50.png';
  // } else if (cards[index].value == 100) {
  //   cardElement.children[1].src = '100.png';
  // } else if (cards[index].value == 200) {
  //   cardElement.children[1].src = '200.png';
  // } else {
  //   cardElement.children[1].src = 'empty.png';
  // }
  if (!selectedCards.includes(index)) {
    selectedCards.push(index);
  }
}

// Update score and progress bar
function updateScore(value) {
  totalScore += value;
  progressFill.style.width = `${(totalScore / 500) * 100}%`;
  progressCount.innerText = `${totalScore}/500$`;
  if (totalScore == 500) {
    newGameBtn.classList.remove('hidden');
  }
}

// Check if the game is over
function checkGameEnd() {
  if (selectedCards.length >= 6) {
    setTimeout(() => {
      alert(`Game Over! Your score: $${totalScore}`);
      initGame();
    }, 500);
  }
}

// Event listener for new game button
newGameBtn.addEventListener('click', initGame);

// Initialize the game on page load
initGame();



// document.addEventListener('DOMContentLoaded', function () {
//   const lotteryTicket = document.getElementsByClassName('card');
//   console.log(lotteryTicket);
//   const topLayer = document.getElementsByClassName('top');

//   let isDrawing = false;

//   topLayer.addEventListener('mousedown', function () {
//     isDrawing = true;
//   });

//   topLayer.addEventListener('mouseup', function () {
//     isDrawing = false;
//   });

//   lotteryTicket.addEventListener('mousemove', function (e) {
//     if (!isDrawing) return;

//     const percent = (e.offsetX / lotteryTicket.clientWidth) * 100;
//     topLayer.style.clipPath = `inset(0 0 0 ${100 - percent}%)`;
//   });
// });