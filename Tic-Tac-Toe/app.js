let boxes= document.querySelectorAll(".box");
let resetbutton= document.querySelector(".reset");
// let newGameButton= querySelector("#newbutton");
let msgContainer= document.querySelector(".msg-container");
let message= document.querySelector("#msg");

let turnO= true; //playerX //playerO

const winpatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame= () => {
    turnO= true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked");
        if(turnO) {   //if(turnO === true) //playerO turn
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText= "X"
            turnO= true;
        }
        box.disabled= true;

        checkWinner();
    })
});
const disableBoxes= () => {
    for (box of boxes) {
        box.disabled= true;
    }
}
const enableBoxes= () => {
    for (box of boxes) {
        box.disabled= false;
        box.innerText="";
    }
}

showWinner = (winner) => {
    msgContainer.innerText= `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner= () => {
    for(let pattern of winpatterns) {
        
        let pos1value = boxes[pattern[1]].innerText;
        let pos2value = boxes[pattern[2]].innerText;
        let pos3value = boxes[pattern[0]].innerText;

        if(pos1value!= "" && pos2value!= "" && pos3value!="") {
            if(pos1value === pos2value && pos2value === pos3value) {
                // console.log ("Winner is", pos1value);
                showWinner(pos1value);
            }
        }
    }
};

newbutton.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);