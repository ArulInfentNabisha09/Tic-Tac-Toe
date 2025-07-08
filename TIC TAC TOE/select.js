let player1Selection = null;
let player2Selection = null;

function selectIcon(iconName) {
  // Save player 1's icon selection
  player1Selection = iconName;
  document.getElementById("result1").innerText = "Selected: " + (iconName === 'ti' ? "Lollipop" : "Donut");

  // Automatically assign the remaining icon to player 2
  if (iconName === 'ti') {
    player2Selection = 'do'; // If player 1 selects Lollipop, player 2 gets Donut
    document.getElementById("result2").innerText = "Assigned: Donut";
  } else if (iconName === 'do') {
    player2Selection = 'ti'; // If player 1 selects Donut, player 2 gets Lollipop
    document.getElementById("result2").innerText = "Assigned: Lollipop";
  }

  // Show the Start Game button
  document.getElementById("startGameButton").style.display = "block";

  // Disable the buttons after selection
  const buttons = document.querySelectorAll('.icon-button');
  buttons.forEach(button => button.disabled = true);

  // Save selections in localStorage
  localStorage.setItem('player1Selection', player1Selection);
  localStorage.setItem('player2Selection', player2Selection);
}





















// let player1Selection = null;
// let player2Selection = null;

// function selectIcon(iconName) {
//   // Save player 1 selection
//   player1Selection = iconName;
//   document.getElementById("result1").innerText = "Selected: " + (iconName === 'ti' ? "Lollipop" : "Donut");

//   // Automatically assign the remaining icon to player 2
//   player2Selection = (iconName === 'ti') ? 'do' : 'ti';
//   document.getElementById("result2").innerText = "Assigned: " + (player2Selection === 'ti' ? "Lollipop" : "Donut");

//   // Show the Start Game button
//   document.getElementById("startGameButton").style.display = "block";

//   // Disable the buttons after selection
//   const buttons = document.querySelectorAll('.icon-button');
//   buttons.forEach(button => button.disabled = true);
// }

