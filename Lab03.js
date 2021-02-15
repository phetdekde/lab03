const player = 'x'
const bot = 'o'
const winCond = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]
let playerTurn = true
const winMessage = document.querySelector('p')

function onClick(e){
    const cell = e.target
    const currPlayer = playerTurn ? player : bot
    placeMark(cell, currPlayer)
    if(checkWin(currPlayer)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else{
        botTurn()
        cell.removeEventListener('click', onClick)
    }
}

function placeMark(cell, currPlayer){
    if(currPlayer == 'x'){
        cell.classList.add(player)
        cell.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/1200px-Letter_x.svg.png"
    }
    else{
        cell.classList.add(bot)
        cell.src = "https://img2.thaipng.com/20180428/xje/kisspng-letter-case-o-alphabet-all-caps-dimensional-characters-26-english-letters-5ae471e0d98030.1299930115249208008909.jpg"
    }
}

function botTurn(){
    playerTurn = !playerTurn
    currPlayer = playerTurn ? player : bot
    var num = Math.floor(Math.random() * 9)
    while(elements[num].classList.contains(player) || elements[num].classList.contains(bot)){
        var num = Math.floor(Math.random() * 9)
        console.log(num)
    }
    cell = elements[num]
    placeMark(cell, currPlayer)
    console.log(currPlayer)
    if(checkWin(currPlayer)){
        console.log(currPlayer)
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else{
        cell.removeEventListener('click', onClick)
    }
    playerTurn = !playerTurn
}
function checkWin(currPlayer){
    return winCond.some(combination => {
        return combination.every(index => {
            return elements[index].classList.contains(currPlayer)
        })
    })
}

function isDraw(){
    return [...elements].every(cell => {
        return cell.classList.contains(player) || cell.classList.contains(bot)
    })
}

function endGame(draw){
    if(draw){
        winMessage.innerText = 'DRAW'
    }
    else{
        if(playerTurn){
            winMessage.innerText = "YOU WIN!"
        }
        else{
            winMessage.innerText = "YOU LOSE!"
        }
    }
    elements.forEach(elem => {
        elem.removeEventListener('click', onClick)
    });
}

const elements = document.querySelectorAll('img')
elements.forEach(elem => {
    elem.addEventListener('click', onClick)
});
