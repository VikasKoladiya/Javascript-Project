let isComputer = false;
let mode = document.querySelector(".turn-mode");
let boxes = document.querySelectorAll(".box");
let compmsg = document.querySelector(".mode-message-details");
let key = 1;
let xturn_user = [];
let oturn_comp = [];
let xidx = 0;
let oidx = 0;
let getwinner = false;
console.log(boxes)
let turn0 = false;
const winningCombinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

function computer(){
    isComputer = true;
    compmsg.classList.remove('hide');
}

function showWinnerPopup(winner){
    const popup = document.getElementById("popup");
    const message = document.getElementById("winner");
    if(winner==="Draw"){
        message.innerText = "Match Draw!";
    }
    else{
        message.innerText = winner + " Wins!";
    }
    popup.style.display = "flex";
}

function handleClick(e){
    if(turn0){
        e.target.innerHTML = 'O';
        mode.innerHTML='X';
        turn0=false;
        oturn_comp[oidx++]=parseInt(e.target.classList[1]);

    }
    else{
        e.target.innerHTML = 'X';
        mode.innerHTML='O';
        turn0=true;
        xturn_user[xidx++]=parseInt(e.target.classList[1]);;
    }
    key++;
    e.target.removeEventListener("click",handleClick);
    checkwinner();
    if(isComputer && key%2==0){
        playwithcomputer();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", handleClick)
});

function restartGame(){
    const popup = document.getElementById("popup");
    popup.style.display = "none";
    setTimeout(() => {
        location.reload();
    },100);
}
const checkwinner = () => {
    getwinner = false;
    for(let patten of winningCombinations){
        let p1 = boxes[patten[0]-1].innerText;
        let p2 = boxes[patten[1]-1].innerText;
        let p3 = boxes[patten[2]-1].innerText;
        if(p1!="" && p2!="" && p3!=""){
            if(p1===p2 && p2===p3){
                getwinner=true;
                showWinnerPopup(p1);
            }
        }
    }
    if(key===10 && !getwinner){
        showWinnerPopup("Draw");
    }
}

function playwithcomputer(e){
    let arr = [undefined, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    for (const iterator of xturn_user) {
        arr[iterator] = 1;
    }
    for (const iterator of oturn_comp) {
        arr[iterator] = 1;
    }
    let empty = [];
    for (let idx = 1; idx <= 9; idx++) {
        if (arr[idx] === -1) {
            empty.push(idx);
        }
    }
    let size = empty.length;
    for (const move of empty) {
        let tempA = [...xturn_user, move];
        for (const combination of winningCombinations) {
            if (combination.every(num => tempA.includes(num))) {
                document.getElementsByClassName(`${move}`)[0].click();
                console.log(move);
                return;
            }
        }
    }

    for (const move of empty) {
        let tempC = [...oturn_comp, move];
        for (const combination of winningCombinations) {
            if (combination.every(num => tempC.includes(num))) {
                document.getElementsByClassName(`${move}`)[0].click();
                return;
            }
        }
    }
    
    let random = Math.floor(Math.random() * size);
    document.getElementsByClassName(`${empty[random]}`)[0].click();
    console.log(empty[random]);
}