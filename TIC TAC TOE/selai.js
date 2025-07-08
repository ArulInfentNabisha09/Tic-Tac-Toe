let playerSelection = null;
let aiSelection = null;

function selectIcon(iconName) {
  // Save player's choice
  playerSelection = iconName;
  document.getElementById("resultPlayer").innerText = "Selected: " + (iconName === 'ti' ? "Lollipop" : "Donut");

  // AI automatically gets the other icon
  aiSelection = (iconName === 'ti') ? 'do' : 'ti';
  document.getElementById("resultAI").innerText = "Assigned to AI: " + (aiSelection === 'ti' ? "Lollipop" : "Donut");

  // Save to localStorage (consistent key names)
  localStorage.setItem('player1Selection', playerSelection);  // Updated key
  localStorage.setItem('player2Selection', aiSelection);      // Updated key

  // Disable buttons after selection
  const buttons = document.querySelectorAll('.icon-button');
  buttons.forEach(button => button.disabled = true);

  // Show the Start Game button
  document.getElementById("startGameButton").style.display = "block";
}






// let playerSelection = null;
// let aiSelection = null;

// function selectIcon(iconName) {
//   // Save player's choice
//   playerSelection = iconName;
//   document.getElementById("resultPlayer").innerText = "Selected: " + (iconName === 'ti' ? "Lollipop" : "Donut");

//   // AI automatically gets the other icon
//   aiSelection = (iconName === 'ti') ? 'do' : 'ti';
//   document.getElementById("resultAI").innerText = "Assigned to AI: " + (aiSelection === 'ti' ? "Lollipop" : "Donut");

//   // Save to localStorage (useful for next page)
//   localStorage.setItem('playerSelection', playerSelection);
//   localStorage.setItem('aiSelection', aiSelection);

//   // Disable buttons after selection
//   const buttons = document.querySelectorAll('.icon-button');
//   buttons.forEach(button => button.disabled = true);

//   // Show the Start Game button
//   document.getElementById("startGameButton").style.display = "block";
// }
