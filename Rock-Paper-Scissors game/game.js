let userScore = 0;
let compScore = 0;

let msg = document.querySelector("#msg");
const choices = document.querySelectorAll(".choice");

const userScorePnt = document.querySelector("#user-score");
const compScorePnt = document.querySelector("#comp-score");

const genCompChoice = () => {
    let options = ["rock", "papper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame = () => {
    msg.innerText = "Game Was Draw..!";
    msg.style.backgroundColor = "blue";
}

const showWinner = (userWin) => {
    if (userWin === true) {
        userScore++;
        userScorePnt.innerText = userScore;
        msg.innerText = "You win..!";
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePnt.innerText = compScore;
        msg.innerText = "You lost...!";
        msg.style.backgroundColor = "red";
    }
}

const palyGame = (userchoiceId) => {
    console.log("user choice", userchoiceId);
    const compChoiceId = genCompChoice();
    console.log("computer choice: ", compChoiceId);
    if (userchoiceId === compChoiceId) {
        drawGame();
    }
    else {
        let userWin = true;
        if (userchoiceId === "rock") {
            userWin = compChoiceId === "papper" ? false : true;
        } else if (userchoiceId === "papper") {
            userWin = compChoiceId === "scissor" ? false : true;
        } else {
            userWin = compChoiceId === "rock" ? false : true;
        }
        showWinner(userWin);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoiceId = choice.getAttribute("id");
        palyGame(userchoiceId);
    })
})