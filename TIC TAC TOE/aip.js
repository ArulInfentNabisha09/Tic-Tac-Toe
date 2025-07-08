let playerIcon = localStorage.getItem("player1Selection") || "ti";  // Default "ti" for Player
let aiIcon = localStorage.getItem("player2Selection") || "do";      // Default "do" for AI

// Function to display icon (Lollipop or Donut)
function displayIcon(icon) {
  if (icon === "ti") {
    return '<img src="assets/ti.png" alt="Lollipop" class="icon">';
  } else if (icon === "do") {
    return '<img src="assets/do.jpg" alt="Donut" class="icon">';
  }
  return '';
}

// Display the selected icons for Player and AI
document.getElementById("player1-icon").innerHTML = displayIcon(playerIcon);
document.getElementById("player2-icon").innerHTML = displayIcon(aiIcon);

const boxes = document.querySelectorAll(".box");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Player";   
let running = true;

// Initial Status
statusText.innerHTML = `
  <span class="player-icon">${displayIcon(playerIcon)}</span>
  <span>${currentPlayer}'s Turn</span>
`;

// Event listeners
boxes.forEach(box => box.addEventListener('click', boxClick));
restartBtn.addEventListener('click', restartGame);

function boxClick() {
  const index = this.dataset.index;
  if (options[index] !== "" || !running) return;

  options[index] = playerIcon;
  this.innerHTML = displayIcon(playerIcon);

  if (checkWinner(playerIcon)) {
    endGame("Player Wins! 🎉");
  } else if (!options.includes("")) {
    endGame("It's a Draw! 🤝");
  } else {
    setTimeout(aiTurn, 500); // AI makes move after short delay for realism
  }
}

function aiTurn() {
  const bestMove = minimax(options, true).index;
  options[bestMove] = aiIcon;
  boxes[bestMove].innerHTML = displayIcon(aiIcon);

  if (checkWinner(aiIcon)) {
    endGame("AI Wins! 🤖🏆");
  } else if (!options.includes("")) {
    endGame("It's a Draw! 🤝");
  }
}

function checkWinner(icon) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (options[a] === icon && options[b] === icon && options[c] === icon) {
      highlightWin([a, b, c]);
      return true;
    }
  }
  return false;
}

// New function: Check winner WITHOUT highlighting (used inside minimax)
function checkWinnerNoHighlight(icon, board) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] === icon && board[b] === icon && board[c] === icon) {
      return true;
    }
  }
  return false;
}

function highlightWin(indices) {
  indices.forEach(i => {
    boxes[i].classList.add('win');
  });
}

function endGame(message) {
  running = false;
  statusText.textContent = message;
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  boxes.forEach(box => {
    box.innerHTML = '';
    box.classList.remove('win');
  });
  statusText.innerHTML = `
    <span class="player-icon">${displayIcon(playerIcon)}</span>
    <span>Player's Turn</span>
  `;
}

// Minimax Algorithm
function minimax(newBoard, isMaximizing) {
  const availSpots = newBoard.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

  if (checkWinnerNoHighlight(playerIcon, newBoard)) {
    return { score: -10 };
  } else if (checkWinnerNoHighlight(aiIcon, newBoard)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    const move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = isMaximizing ? aiIcon : playerIcon;

    const result = minimax(newBoard, !isMaximizing);
    move.score = result.score;

    newBoard[availSpots[i]] = "";

    moves.push(move);
  }

  let bestMove;
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}





// let playerIcon = localStorage.getItem("player1Selection") || "ti";  // Default "ti" for Player
// let aiIcon = localStorage.getItem("player2Selection") || "do";      // Default "do" for AI

// function displayIcon(icon) {
//   if (icon === "ti") {
//     return '<img src="assets/ti.png" alt="Lollipop" class="icon">';
//   } else if (icon === "do") {
//     return '<img src="assets/do.jpg" alt="Donut" class="icon">';
//   }
//   return '';
// }

// document.getElementById("player1-icon").innerHTML = displayIcon(playerIcon);
// document.getElementById("player2-icon").innerHTML = displayIcon(aiIcon);

// const boxes = document.querySelectorAll(".box");
// const statusText = document.getElementById("status");
// const restartBtn = document.getElementById("restart");

// let options = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "Player";   
// let running = true;

// // Initial Status
// statusText.innerHTML = `
//   <span class="player-icon">${displayIcon(playerIcon)}</span>
//   <span>${currentPlayer}'s Turn</span>
// `;

// // Event listeners
// boxes.forEach(box => box.addEventListener('click', boxClick));
// restartBtn.addEventListener('click', restartGame);

// function boxClick() {
//   const index = this.dataset.index;
//   if (options[index] !== "" || !running) return;

//   options[index] = playerIcon;
//   this.innerHTML = displayIcon(playerIcon);

//   if (checkWinner(playerIcon)) {
//     endGame("Player Wins! 🎉");
//   } else if (!options.includes("")) {
//     endGame("It's a Draw! 🤝");
//   } else {
//     setTimeout(aiTurn, 500); // AI makes move after short delay for realism
//   }
// }

// function aiTurn() {
//   const bestMove = minimax(options, true).index;
//   options[bestMove] = aiIcon;
//   boxes[bestMove].innerHTML = displayIcon(aiIcon);

//   if (checkWinner(aiIcon)) {
//     endGame("AI Wins! 🤖🏆");
//   } else if (!options.includes("")) {
//     endGame("It's a Draw! 🤝");
//   }
// }

// function checkWinner(icon) {
//   const winConditions = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6]
//   ];

//   for (let condition of winConditions) {
//     const [a, b, c] = condition;
//     if (options[a] === icon && options[b] === icon && options[c] === icon) {
//       highlightWin([a, b, c]);
//       return true;
//     }
//   }
//   return false;
// }

// // New function: Check winner WITHOUT highlighting (used inside minimax)
// function checkWinnerNoHighlight(icon, board) {
//   const winConditions = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6]
//   ];

//   for (let condition of winConditions) {
//     const [a, b, c] = condition;
//     if (board[a] === icon && board[b] === icon && board[c] === icon) {
//       return true;
//     }
//   }
//   return false;
// }

// function highlightWin(indices) {
//   indices.forEach(i => {
//     boxes[i].classList.add('win');
//   });
// }

// function endGame(message) {
//   running = false;
//   statusText.textContent = message;
// }

// function restartGame() {
//   options = ["", "", "", "", "", "", "", "", ""];
//   running = true;
//   boxes.forEach(box => {
//     box.innerHTML = '';
//     box.classList.remove('win');
//   });
//   statusText.innerHTML = `
//     <span class="player-icon">${displayIcon(playerIcon)}</span>
//     <span>Player's Turn</span>
//   `;
// }

// // Minimax Algorithm
// function minimax(newBoard, isMaximizing) {
//   const availSpots = newBoard.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

//   if (checkWinnerNoHighlight(playerIcon, newBoard)) {
//     return { score: -10 };
//   } else if (checkWinnerNoHighlight(aiIcon, newBoard)) {
//     return { score: 10 };
//   } else if (availSpots.length === 0) {
//     return { score: 0 };
//   }

//   const moves = [];

//   for (let i = 0; i < availSpots.length; i++) {
//     const move = {};
//     move.index = availSpots[i];
//     newBoard[availSpots[i]] = isMaximizing ? aiIcon : playerIcon;

//     const result = minimax(newBoard, !isMaximizing);
//     move.score = result.score;

//     newBoard[availSpots[i]] = "";

//     moves.push(move);
//   }

//   let bestMove;
//   if (isMaximizing) {
//     let bestScore = -Infinity;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     let bestScore = Infinity;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }

//   return moves[bestMove];
// }
