let selectedBox = ''
let blocks = document.getElementsByClassName("block") 
let char = ''

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



//on click populate the block
//if block has not been clicked, populate with correct x or o
document.querySelectorAll('.block').forEach(block => {
    block.addEventListener('click', event => {
        char = gameState.players[0]
        if(block.innerHTML === ""){
            block.insertAdjacentHTML("afterbegin", char);
            selectedBox = block.getAttribute('id')
            swapTurns()
            addBoard(selectedBox, char)
            //console.log(gameState.board)
        }
        
        
        //addBoard(char)
        //console.log()
        
       
    })
})



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

    if(gameState.board[row][col] === null){
        gameState.board[row][col] = char
    }
    
    console.log(gameState.board)
}
}





//start over
function clearOut(){
//   for(let i = 0; i < blocks.length; i++){
//     blocks[i].innerHTML = ''
//   }
  window.location.reload()
}
