document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    setupInput();
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

    function setupInput() {
        const inp = document.querySelector(".main-input input");
        inp.onblur = function() {
            var x = window.scrollX, y = window.scrollY;
            inp.focus();
            window.scrollTo(x, y);
        };

        inp.onchange = function() {
            var x = window.scrollX, y = window.scrollY;
            // inp.focus();
            window.scrollTo(x, y);
        };
    }

    function pickWord() {
        var fr = new FileReader();
        fr.onload = function(){
            word = fr.result;
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
});