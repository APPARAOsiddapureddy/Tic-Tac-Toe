document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".game-box");
    const restartBtn = document.getElementById("rst-btn");
    const newGameBtn = document.getElementById("ng-btn");
    const hideNG = document.querySelector(".slider-winner");
    const hideRG = document.querySelector("main");
    const message = document.getElementById("disp");

    let count = 0;
    let turnO = true;
    let gameOver = false;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    function checkWin() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
                return boxes[a].innerHTML;
            }
        }
        return null;
    }

    function handleClick(event) {
        if (gameOver) return;
        const box = event.target;
        if (box.innerHTML !== "") return;

        box.innerHTML = turnO ? "O" : "X";
        box.disabled = true;
        count++;
        turnO = !turnO;

        const winner = checkWin();
        if (winner) {
            gameOver = true;
            message.innerHTML = `Winner: ${winner}`;
            hideNG.classList.remove("hide");
            hideRG.classList.add("hide");
        } else if (count === 9) {
            gameOver = true;
            message.innerHTML = "It's a Tie!";
            hideNG.classList.remove("hide");
            hideRG.classList.add("hide");
        }
    }

    function restartGame() {
        boxes.forEach(box => {
            box.innerHTML = "";
            box.disabled = false;
        });
        count = 0;
        turnO = true;
        gameOver = false;
    }

    function newGame() {
        restartGame();
        hideNG.classList.add("hide");
        hideRG.classList.remove("hide");
    }

    boxes.forEach(box => box.addEventListener("click", handleClick));
    restartBtn.addEventListener("click", restartGame);
    newGameBtn.addEventListener("click", newGame);
});
