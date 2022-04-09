//variables
let selectedBox = ''
let blocks = document.getElementsByClassName("block")
let char = ''
let result = document.getElementById("result")
let turn = document.getElementById("turn")
let board = document.getElementsByClassName("board")[0]
let xx = 0
let tie = 0
let oo = 0



const gameState = {
    players: ['x', 'o'], //current player is whomever in 0 position and swap after each play
    board: [null,null, null, null, null, null, null, null, null]
  }

  WIN_COMBINATIONS = [ 
    [0,1,2], //top_row 
    [3,4,5], //middle_row 
    [6,7,8], //bottom_row 
    [0,3,6], //left_column 
    [1,4,7], //center_column 
    [2,5,8], //right_column 
    [0,4,8], //left_diagonal 
    [6,4,2] //right_diagonal 
    ]

//alternate turns
function swapTurns (){
    let temp = gameState.players[0]
    gameState.players[0] = gameState.players[1]
    gameState.players[1] = temp
}


//check if this click completes the 3 in a row, if true end game --> disable board
//right now it's only running every 3rd or 5th time, why?
function addBoard(selectedNum, char){
    //add char to the board
    if(gameState.board[selectedNum] === null){
        gameState.board[selectedNum] = char
    }

}


//check if column is a winner
function checkRow(selectedNum){
    selectedNum = parseInt(selectedNum)
    for(let i = 0; i < WIN_COMBINATIONS.length; i++){
        
        if(WIN_COMBINATIONS[i].indexOf(selectedNum) > -1){
            currRow = WIN_COMBINATIONS[i]
            
            let charX = currRow[0]
            let charY = currRow[1]
            let charZ = currRow[2]
            let testBoard = gameState.board
            
            if(testBoard[charX] === testBoard[charY] && testBoard[charY] === testBoard[charZ]){
                return true
            }
    }    
    }      
}
    
//keeps count of score
function score(char){
    let xScore = document.getElementById("xScore")
    let tieScore = document.getElementById("tieScore")
    let oScore = document.getElementById("oScore")
    if(char === 'x'){
        xx++
        xScore.innerHTML = xx
    }
    else if(char === 'o'){
        oo++
        oScore.innerHTML = oo
    }

}

function tieCheck(selectedBox){
    if(!gameState.board.includes(null) && !checkRow(selectedBox)){
        result.innerHTML = "Tie game!"
        tie++
        tieScore.innerHTML = tie
        
    }
}


//on click populate the block
//if block has not been clicked, populate with correct x or o
for (const blck of blocks){
    blck.addEventListener('click', (event) =>{
        char = gameState.players[0]
        turn.innerHTML = ""
            if(blck.innerHTML === ""){
                blck.insertAdjacentHTML("afterbegin", char);
                selectedBox = blck.getAttribute('id')
                addBoard(selectedBox, char)
                swapTurns()
                
                
                // if user wins across row, disable the board
                if(checkRow(selectedBox)){
                    result.innerHTML = "Congratulations! Player " + char + " won!"
                    board.setAttribute("style", "pointer-events: none;")
                    score(char)
                    
                    
                }
                tieCheck(selectedBox)
                
            }    
    })
    }


//clear board
function clearOut(){
  for(let i = 0; i < blocks.length; i++){
    blocks[i].innerHTML = ''
  }

  let brd = gameState.board
  for(let j = 0; j < brd.length; j++){
    
      brd[j] = null
    
  }
  result.innerHTML = ""
  turn.innerHTML = "It's " + gameState.players[0] + " turn"
  board.setAttribute("style", "pointer-events: auto;")
  
}

//hard restart
function restart(){
    window.location.reload()
}
