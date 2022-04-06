let selectedBox = ''
let blocks = document.getElementsByClassName("block")
let char = ''
let result = document.getElementById("result")
let board = document.getElementById("board")

const gameState = {
    players: ['x', 'o'], //current player is whomever in 0 position and swap after each play
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

//alternate turns
function swapTurns (){
    let temp = gameState.players[0]
    gameState.players[0] = gameState.players[1]
    gameState.players[1] = temp
}


//check if this click completes the 3 in a row, if true end game --> disable board
//right now it's only running every 3rd or 5th time, why?
function addBoard(selectedNum, char){
    let row = 0;
    let col = 0;
    let num = parseInt(selectedNum)
   if(num >= 3 && num <= 5) {
        row = 1;
   }
   else if(num >= 6 && num <= 8){
       row = 2
   }

   if(row === 0){
       col = num
   }

   if(row === 1){
       if(num === 4){
        col = 1
       }
       else if(num === 5){
        col = 2
       }
   }

   if(row === 2){
    if(num === 7){
     col = 1
    }
    else if(num === 8){
     col = 2
    }
    }

    if(gameState.board[row][col] === null){
        gameState.board[row][col] = char
    }
    return row

    // console.log("addBoard function just ran")
    // console.log(num, row, col)
}


//check if play was a winning one
//compare small arrays from gamestate.board
function getRow(row){
    let sameRow = true
    
        let across = gameState.board[row]
        console.log("row is ", across)
        for(let j = 0; j < across.length; j++){
            for(k = j + 1; k < across.length; k++){
                if(across[j] !== across[k]){
                    sameRow = false
                }
            }
        }
    
    
    return sameRow

    
}

//check if column is a winner
function getCol(){
    // let col = 0
    let board = gameState.board
    let sameCol = true
    for(let i = 0; i < board.length; i++){
        let col = board.map(b => b[i])
        console.log(col)
        for(let j = 0; j < col.length; j++){
            for(k = j + 1; k < col.length; k++){
                if(col[j] !== col[k]){
                    sameCol = false;
                }
            }
        }
    }
    console.log(sameCol)
    
}


//on click populate the block
//if block has not been clicked, populate with correct x or o
for (const blck of blocks){
    blck.addEventListener('click', (event) =>{
        char = gameState.players[0]
        
            if(blck.innerHTML === ""){
                blck.insertAdjacentHTML("afterbegin", char);
                selectedBox = blck.getAttribute('id')
                
                swapTurns()
                
                // if user wins across row, disable the board
                if(getRow((addBoard(selectedBox, char)))){
                    result.innerHTML = "Congratulations!"
                    // board.setAttribute("style", "pointer-events:none")
                    // console.log(typeof board)
                }
                
            }
            //getCol()
            
            
    })
    }


//start over
function clearOut(){
//   for(let i = 0; i < blocks.length; i++){
//     blocks[i].innerHTML = ''
//   }
  window.location.reload()
}
