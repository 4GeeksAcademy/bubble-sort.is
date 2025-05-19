const suits = ['♦', '♥', '♠', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let cards = [];

const cardCountInput = document.getElementById("cardCount");
const drawButton = document.getElementById("drawButton");
const sortButton = document.getElementById("sortButton");
const cardsContainer = document.getElementById("cardsContainer");
const logContainer = document.getElementById("logContainer");

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
}

function getCardColor(suit) {
  return suit === '♦' || suit === '♥' ? 'red' : 'black';
}

function getCardValue(card) {
  if (card.value === 'A') return 1;
  if (card.value === 'J') return 11;
  if (card.value === 'Q') return 12;
  if (card.value === 'K') return 13;
  return parseInt(card.value);
}

function createCardHTML(card) {
  const div = document.createElement("div");
  div.className = `card ${getCardColor(card.suit)}`;
  div.innerText = card.value;
  return div;
}

function renderCards(cardsArr, container) {
  container.innerHTML = "";
  cardsArr.forEach(card => {
    container.appendChild(createCardHTML(card));
  });
}

function drawCards() {
  const count = parseInt(cardCountInput.value);
  cards = Array.from({ length: count }, getRandomCard);
  renderCards(cards, cardsContainer);
  logContainer.innerHTML = "";
}

function sortCards() {
  const arr = [...cards];
  logContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (getCardValue(arr[j]) > getCardValue(arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        const row = document.createElement("div");
        row.className = "log-row";
        arr.forEach(card => {
          row.appendChild(createCardHTML(card));
        });
        logContainer.appendChild(row);
      }
    }
  }
  cards = arr;
  renderCards(cards, cardsContainer);
}

drawButton.addEventListener("click", drawCards);
sortButton.addEventListener("click", sortCards);
