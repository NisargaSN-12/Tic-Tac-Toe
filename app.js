let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let clickCount = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5], 
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    clickCount = 0;
    enabledBoxes();
    hideWinner();
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box is clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "#8c1c13";
            turnO = false;
        }
        else {
            box.innerText= "X";
            box.style.color = "Black";
            turnO = true;
        }
        box.disabled = true;
        clickCount++;

        checkWinner();
    })
})

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText ="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("show");
    disabledBoxes();
}

const hideWinner = () => {
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("show");
}

const draw = () =>{
    if (clickCount === 9) {
        msg.innerText = `It's a draw!`;
        msgContainer.classList.remove("hide");
        msgContainer.classList.add("show");
        disabledBoxes();
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                showWinner(posVal1);
                return;
            }
        }
    }
    draw();
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", hideWinner);
newGameBtn.addEventListener("click", hideWinner);