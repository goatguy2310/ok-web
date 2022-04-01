document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    pickWord();
    let word = "";

    function createBoard() {
        const board = document.getElementById("gameboard");

        for(let i = 0; i < 70; i++) {
            let sq = document.createElement("div");
            sq.classList.add("gamesquare");
            sq.setAttribute("id", i);
            board.appendChild(sq);
        }
    }

    function pickWord() {
        var text = null;
        var req = new XMLHttpRequest();
        req.open("GET", "http://127.0.0.1:5500//words.txt", false);
        req.send();
        if(req.status === 200 || req.status === 0) {
            text = req.responseText;
        }
    }

    let cur = 0;
    let curWord = 0;
    let btn = document.querySelectorAll(".keyboard-row button");

    for(let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            key = btn[i].getAttribute("data-key");
            if(key == "space") {

            } else if(key == "del") {
                deleteLetter(key);
            } else if(key == "enter") {

            } else {
                addLetter(key);
            }
        });
    }

    function addLetter(letter) {
        if(Math.floor(cur / 7) != curWord) return;

        const sq = document.getElementById(String(cur));
        sq.textContent = letter.toUpperCase();
        cur++;
    }

    function deleteLetter() {
        if(Math.floor(cur / 7) == curWord && cur % 7 == 0) return;

        cur--;
        const sq = document.getElementById(String(cur));
        sq.textContent = "";
    }
});