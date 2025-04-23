// 1)Access all the required elements from html
let boxes = document.querySelectorAll(".box");
console.log(boxes.length);
let resetBtn = document.querySelector("#reset-btn");
// console.log(resetBtn)
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let msgSorry = document.querySelector(".msg-sorry");
let newGameBtn = document.querySelector("#new-btn");
// 2)To play the game we need some varibales
// varible to track the turn of playerX/player0
let count = 0;
let turnO = true;
let isWinner;

// 3)store the winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// 4)when u click on each btn which are presetn in boxes as a node list
// some action should happen, for that we used addEventlisteners
// before adding Event listeners we need to get each individual btn bcoz boxes contains nodelist/array of btns
// using foreach on boxes we can get each individual btn and then add them evetnlistener to perfom some action
// console.log(winPatterns)

boxes.forEach((box) => {
  // console.log(box)
  box.addEventListener("click", () => {
    if (turnO == true) {
      box.innerText = "O";
      box.classList.add("O-Greencolor");
      box.classList.remove("X-Redcolor");
      // console.log( box.innerText='O')
      turnO = false;
      // box.disabled=true
    } else {
      box.innerText = "X";
      box.classList.add("X-Redcolor");
      box.classList.remove("O-Greencolor");
      // console.log( box.innerText='X')
      turnO = true;
    }
    box.disabled = true;
    count++;
    console.log(count);
    // isWinner = checkWinner();
    checkWinner()
    if (count == boxes.length && !checkWinner()) {
      Draw();
    }

    // to check winner
    //   checkWinner()
  });
});

const Draw = () => {
  msg.innerText = "Game was Drawn ";
  msg_container.classList.remove("hide");
  diableBoxes();
  // msgSorry.classList.remove('msg-sorry')
};
// 5)showWinner
const showWinner = (winner) => {
  msg.innerText = `Congratulations Winner ${winner} 🎉😎🎊`;
  msg_container.classList.remove("hide");
  diableBoxes();
};

// 6)if a match is found diable other boxes/btns bcoz if u don't do that u can again fill the empty boxes and again a match can occur and
// we get one more winner(which v don't want) ,at first match it self game should end
const diableBoxes = () => {
  for (Box of boxes) {
    Box.disabled = true;
  }
};
// 7)Enable----when we finish game and after winner announced again to start the game
const enableBoxes = () => {
  for (Box of boxes) {
    Box.disabled = false;
    Box.innerText = "";
  }
};

// 4)As of now we are just adding the values but we are not tracking the winner
// how to track?==each time when u click on btn check if winner
// for the create a function checkWinner()
const checkWinner = () => {
  for (pattern of winPatterns) {
    // console.log(pattern[0],pattern[1],pattern[2]) (0,1,2.......6,7,8)
    // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])(boxes[0],boxes[1],boxes[2]......boxes[6],boxes[7],boxes[8])
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    // any box should not be empty if we want to know the winner
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 == posVal2 && posVal2 == posVal3) {
        console.log(`${posVal1} is the Winner`);
        // diableBoxes()
        showWinner(posVal1);
      }
    }
  }
};

// 8)Rest Game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msg_container.classList.add("hide");
};

// 9
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
