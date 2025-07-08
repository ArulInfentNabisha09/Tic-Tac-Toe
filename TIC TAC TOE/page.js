// Get player icons from localStorage
let player1Selection = localStorage.getItem("player1Selection") || "ti";  // Default to "ti" if not set
let player2Selection = localStorage.getItem("player2Selection") || "do";  // Default to "do" if not set

function displayIcon(icon) {
  // If player selects Lollipop
  if (icon === "ti") {
    return '<img src="assets/ti.png" alt="Lollipop" class="icon">'; // Lollipop icon
  } 
  // If player selects Donut
  else if (icon === "do") {
    return '<img src="assets/do.jpg" alt="Donut" class="icon">'; // Donut icon
  }
  return '';
}

// Update top icons for Player-1 and Player-2
document.getElementById("player1-icon").innerHTML = displayIcon(player1Selection);
document.getElementById("player2-icon").innerHTML = displayIcon(player2Selection);

// Game setup
const boxes = document.querySelectorAll(".box");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Player-1";
let currentIcon = player1Selection;
let running = true;

// Initial status
statusText.innerHTML = `
  <span class="player-icon">${displayIcon(currentIcon)}</span>
  <span>${currentPlayer}'s Turn</span>
`;

// Click Event
boxes.forEach(box => box.addEventListener('click', boxClick));
restartBtn.addEventListener('click', restartGame);

function boxClick() {
  const index = this.dataset.index;
  if (options[index] !== "" || !running) return;

  options[index] = currentIcon;
  this.innerHTML = displayIcon(currentIcon);

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
  } else {
    changePlayer();
  }
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  let won = false;
  winConditions.forEach(condition => {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      won = true;
    }
  });

  return won;
}

function changePlayer() {
  currentPlayer = (currentPlayer === "Player-1") ? "Player-2" : "Player-1";
  currentIcon = (currentIcon === player1Selection) ? player2Selection : player1Selection;

  statusText.innerHTML = `
    <span class="player-icon">${displayIcon(currentIcon)}</span>
    <span>${currentPlayer}'s Turn</span>
  `;
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  currentPlayer = "Player-1";
  currentIcon = player1Selection;

  boxes.forEach(box => {
    box.innerHTML = '';
    box.classList.remove('win');
  });

  statusText.innerHTML = `
    <span class="player-icon">${displayIcon(currentIcon)}</span>
    <span>${currentPlayer}'s Turn</span>
  `;
}







// // Retrieve player selections from localStorage
// let player1Selection = localStorage.getItem("player1Selection") || 'ti'; // Default ti
// let player2Selection = localStorage.getItem("player2Selection") || 'do'; // Default do

// // Function to display the correct icon
// function displayIcon(icon) {
//   if (icon === 'ti') {
//     return '<img src="assets/ti.png" alt="Lollipop" class="player-img">';
//   } else if (icon === 'do') {
//     return '<img src="assets/do.jpg" alt="Donut" class="player-img">';
//   }
//   return '';
// }

// // Update Player icons on top
// document.getElementById("player1-icon").innerHTML = displayIcon(player1Selection);
// document.getElementById("player2-icon").innerHTML = displayIcon(player2Selection);

// // Also show player names and icons in status bar
// document.getElementById("status").innerHTML = `
//   <span class="player-icon">${displayIcon(player1Selection)}</span>
//   <span>Player-1 &nbsp;&nbsp;</span>
//   <span id="vs"> vs </span>
//   <span>Player-2 &nbsp;&nbsp;</span>
//   <span class="player-icon">${displayIcon(player2Selection)}</span>
// `;

// // Game Logic
// let options = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = 'Player-1'; // Player-1 starts
// let currentIcon = player1Selection;
// let running = true;

// const boxes = document.querySelectorAll('.box');
// const statusText = document.getElementById('status');
// const restartBtn = document.getElementById('restart');

// const winConditions = [
//   [0,1,2], [3,4,5], [6,7,8], // rows
//   [0,3,6], [1,4,7], [2,5,8], // columns
//   [0,4,8], [2,4,6]           // diagonals
// ];

// // Start the game
// boxes.forEach(box => box.addEventListener('click', boxClick));
// restartBtn.addEventListener('click', restartGame);

// // When box clicked
// function boxClick() {
//   const index = this.dataset.index;
//   if (options[index] !== "" || !running) return;

//   options[index] = currentIcon;
//   this.innerHTML = displayIcon(currentIcon);

//   if (checkWinner()) {
//     statusText.textContent = `${currentPlayer} Wins! 🎉`;
//     running = false;
//   } else if (!options.includes("")) {
//     statusText.textContent = `It's a Draw! 🤝`;
//     running = false;
//   } else {
//     changePlayer();
//   }
// }

// // Check winner
// function checkWinner() {
//   let won = false;
//   for (let i = 0; i < winConditions.length; i++) {
//     const [a, b, c] = winConditions[i];
//     if (options[a] && options[a] === options[b] && options[a] === options[c]) {
//       boxes[a].classList.add('win');
//       boxes[b].classList.add('win');
//       boxes[c].classList.add('win');
//       won = true;
//     }
//   }
//   return won;
// }

// // Change Player turn
// function changePlayer() {
//   if (currentPlayer === 'Player-1') {
//     currentPlayer = 'Player-2';
//     currentIcon = player2Selection;
//   } else {
//     currentPlayer = 'Player-1';
//     currentIcon = player1Selection;
//   }

//   // Update the status to only show the current player's icon and name
//   statusText.innerHTML = `
//     <span class="player-icon">${displayIcon(currentIcon)}</span>
//     <span>${currentPlayer} </span>
//   `;
// }

// // Restart Game
// function restartGame() {
//   options = ["", "", "", "", "", "", "", "", ""];
//   running = true;
//   currentPlayer = 'Player-1';
//   currentIcon = player1Selection;
//   boxes.forEach(box => {
//     box.innerHTML = '';
//     box.classList.remove('win');
//   });

//   // Reset status to initial state
//   statusText.innerHTML = `
//     <span class="player-icon">${displayIcon(player1Selection)}</span>
//     <span>Player-1 </span>
//   `;
// }




// const boxs=document.querySelectorAll('.box');
// const stateup=document.getElementById('status');
// const restart=document.querySelector('#restart');

// let x="<img  id=ti src='assets/ti.png'>";
// let o="<img  id=do src='assets/do.jpg'>";


// const win=[
//     [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
// ];

// let options=["","","","","","","","",""]
// let currentPlayer=x
// let player="Player-1"
// let running=false;
// start();

// function start(){
//   boxs.forEach(box=>box.addEventListener('click',clik));
//   restart.addEventListener('click',reset)
//   stateup.textContent=`${player}`;
//   running=true
// }

// function clik(){
//  let index=this.dataset.index;
//  if(options[index]!="" || !running){
//     return;
//  }
//   update(this,index);
// }


// function update(box,index){
//    options[index]=currentPlayer;
//    box.innerHTML=currentPlayer;
//    checkwin()
// }


// function checkwin(){
//     let isWon=false;
//     for(let i=0;i<win.length;i++){
//         const condition=win[i];
//         const box1=options[condition[0]]
//         const box2=options[condition[1]]
//         const box3=options[condition[2]]
//                if(box1=="" ||box2=="" || box3==""){
//                 continue;
//               }
//                 if(box1==box2 && box2==box3){
//                 isWon=true;
//                 boxs[condition[0]].classList.add('win');
//                 boxs[condition[1]].classList.add('win');
//                 boxs[condition[2]].classList.add('win');
//                }
//               }
//             //   if(box1 !== "" && box1 === box2 && box2 === box3){
//             //     isWon = true;
//             //     break; 
//             // }

//                        if(isWon){
//                        stateup.textContent=`${player} Won 🎉🎊`
//                        running=false;
//                        }
//                        else if(!options.includes("")){
//                             stateup.textContent=`Game Draw 🤝!`
//                             running=false;
//                        }
//                        else{
//                         changePlayer();
//                        }
                       
//             }
// function changePlayer(){
//   player=(player=="Player-1")?"Player-2" : "Player-1";
//   currentPlayer=(currentPlayer==x)?o : x
//   stateup.textContent=`${player}`
// }


// function reset(){
//      options=["","","","","","","","",""]
//      currentPlayer=x
//     player="Player-1"
//     running=true;
//     stateup.textContent=`${player}`;
//     boxs.forEach(box=>{
//         box.innerHTML="";
//         box.classList.remove('win');
//     })
// }




