document.addEventListener("DOMContentLoaded", () => {
    let word = "";
    let arr = [];
    let ord = 0;

    createBoard();
    pickWord();

    function noTone(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");

        return str;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    function createBoard() {
        const board = document.getElementById("gameboard");

        for(let i = 0; i < 49; i++) {
            let sq = document.createElement("div");
            sq.classList.add("gamesquare");
            sq.setAttribute("id", i);
            board.appendChild(sq);
        }
    }

    function pickWord() {
        let req = new XMLHttpRequest();
        req.open("GET", window.location.href + "//words.txt", false);
        req.send();
        if(req.status === 200 || req.status === 0) {
            word = noTone(req.responseText);
            arr = word.split("\n");

            for(let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].substring(0, 7);
            }

            ord = getRandomInt(arr.length);
            word = arr[ord];
            console.log(ord);
            console.log(word);
        }
    }

    let cur = 0;
    let curWord = 0;
    let w = "";
    let btn = document.querySelectorAll(".keyboard-row button");
    let spaceNum = 0;
    let done = false;

    for(let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            if(done) return;
            key = btn[i].getAttribute("data-key");
            if(key == "space") {
                addSpace();
            } else if(key == "del") {
                deleteLetter();
            } else if(key == "enter") {
                enterWord();
            } else {
                addLetter(key);
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if(done) return;
        if(event.key === "Enter") {
            enterWord();
        } else if(event.key === "Backspace") {
            deleteLetter();
        } else if(event.key === " ") {
            addSpace();
            event.preventDefault();
        } else if((/[a-zA-Z]/).test(event.key) && event.key.length == 1) {
            addLetter(event.key);
        }
    });

    function addLetter(letter) {
        if(Math.floor(cur / 7) != curWord) return;

        const sq = document.getElementById(String(cur));
        sq.textContent = letter.toUpperCase();
        w += letter;
        cur++;
    }

    function addSpace() {
        if(Math.floor(cur / 7) != curWord) return;

        if(spaceNum == 1) {
            alert("1 space only!!!!!!!");
            return;
        }
        spaceNum++;

        const sq = document.getElementById(String(cur));
        sq.textContent = " ";
        w += " ";
        cur++;
    }

    function deleteLetter() {
        if(Math.floor(cur / 7) == curWord && cur % 7 == 0) return;

        cur--;
        const sq = document.getElementById(String(cur));
        if(sq.textContent == " ") spaceNum--;
        w = w.substring(0, w.length - 1);
        sq.textContent = "";
    }

    function enterWord() {
        w = w.toLowerCase();
        if(w.length != 7) {
            alert("Not 7 letters!!!!!!!");
            return;
        }

        if(spaceNum == 0) {
            alert("Need 1 space!!!!!!");
            return;
        }

        if(!arr.includes(w)) {
            alert("Not a real word!!!!!!");
            return;
        }

        let cnt = [];
        for(let i = 0; i < 30; i++) {
            cnt.push(0);
        }
        for(let i = cur - 7, j = 0; i < cur; i++, j++) {
            let sq = document.getElementById(String(i));
            if(sq.textContent.toLowerCase() == word[j]) {
                sq.style.backgroundColor = "rgb(83,141,78)";
                sq.style.outlineColor = "rgb(83,141,78)";
                for(let i = 0; i < btn.length; i++) {
                    if(btn[i].getAttribute("data-key") === word[j]) {
                        btn[i].style.backgroundColor = "rgb(83,141,78)";
                        break;
                    }
                }
            } else cnt[charCode(word[j])]++;
        }

        for(let i = cur - 7, j = 0; i < cur; i++, j++) {
            let sq = document.getElementById(String(i));
            if(cnt[charCode(w[j])] != 0) {
                sq.style.backgroundColor = "rgb(181,159,59)";
                sq.style.outlineColor = "rgb(181,159,59)";

                for(let i = 0; i < btn.length; i++) {
                    if(btn[i].getAttribute("data-key") === w[j]) {
                        btn[i].style.backgroundColor = "rgb(83,141,78)";
                        break;
                    }
                }

                cnt[charCode(w[j])]--;
            }
        }

        if(w == word) {
            alert("Congrats!!!!!!!!");
            done = true;
        }

        curWord++;
        spaceNum = 0;
        w = "";
    }

    function charCode(letter) {
        if(letter == " ") return 29;
        else return letter.charCodeAt(0) - "a".charCodeAt(0);
    }
});