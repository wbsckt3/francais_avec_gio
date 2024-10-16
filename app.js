const words = [
  { spanish: "gato", french: "chat" },
  { spanish: "perro", french: "chien" },
  { spanish: "rojo", french: "rouge" },
  { spanish: "azul", french: "bleu" },
  { spanish: "casa", french: "maison" },
  { spanish: "árbol", french: "arbre" },
  { spanish: "queso", french: "fromage" },
  { spanish: "pan", french: "pain" },
  { spanish: "libro", french: "livre" },
  { spanish: "escuela", french: "école" },
  { spanish: "agua", french: "eau" },
  { spanish: "fuego", french: "feu" },
  { spanish: "tierra", french: "terre" },
  { spanish: "sol", french: "soleil" },
  { spanish: "luna", french: "lune" },
  { spanish: "flor", french: "fleur" },
  { spanish: "mesa", french: "table" },
  { spanish: "silla", french: "chaise" },
  { spanish: "ventana", french: "fenêtre" },
  { spanish: "puerta", french: "porte" },
  { spanish: "cielo", french: "ciel" },
  { spanish: "manzana", french: "pomme" },
  { spanish: "plátano", french: "banane" },
  { spanish: "nieve", french: "neige" },
  { spanish: "montaña", french: "montagne" },
];

let shuffledWords = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Limpiar tablero
  shuffledWords = [...words, ...words]; // Duplicar palabras para español y francés
  shuffle(shuffledWords);

  shuffledWords.forEach((word, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index % 2 === 0) {
      card.dataset.word = word.spanish; // Mostrar palabra en español
      card.innerText = word.spanish;
    } else {
      card.dataset.word = word.french; // Mostrar palabra en francés
      card.innerText = word.french;
    }

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return; // Prevenir que se volteen más de dos cartas
  if (this === firstCard) return; // Prevenir doble clic en la misma carta

  this.classList.add('flipped');

  if (!firstCard) {
    // Primera carta volteada
    firstCard = this;
    return;
  }

  // Segunda carta volteada
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.word === secondCard.dataset.word;

  if (isMatch) {
    disableCards();
    matches += 1;
    if (matches === words.length) {
      setTimeout(() => alert('¡Felicidades! Has emparejado todas las palabras.'), 500);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById('reset-button').addEventListener('click', () => {
  matches = 0;
  setupBoard();
});

// Inicializar el juego
setupBoard();
