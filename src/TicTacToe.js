const Matrix = require("./Matrix");

class TicTacToe extends Matrix{

    loadBoard(){
        let newMatrix = []
        this.numRows = 3
        this.numCols = 3
        for(let i = 0; i < this.numRows; i++){
            let row = []
            for( let j = 0; j < this.numCols; j++){
                row.push(".")
            }
            newMatrix.push(row)
        }
        this.matrix = newMatrix
    }

    play(rowNum, columnNum, player){
        const symbol = player === 1 ? "x" : "o"
        this.alter(rowNum, columnNum, symbol)

        let win = true
        for(let i = 0; i < this.numCols; i ++){
            if(this.get(i,columnNum) !== symbol){
                win = false
                break;
            }
        }
        if(win){
            console.log(`Congtadulations Player ${player}`)
        }
    }

}

// let board = new TicTacToe()
// board.loadBoard()
// board.print()

    
// board.play(2, 2, 1)
// board.play(0, 0, 2)
// board.print()
//prints 
// o       .       .
// .       .       .
// .       .       x

let board = new TicTacToe()
board.loadBoard()
    
board.play(2, 2, 1)
board.play(0, 0, 2)
board.play(0, 2, 1)
board.play(1, 0, 2)
board.play(1, 2, 1) //prints Congratulations Player 1
    
board.print()
//prints
// o       .       x
// o       .       x
// .       .       x