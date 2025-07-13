/* Write your code below */
class Matrix {
    constructor(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.matrix = this.generateMatrix(numRows, numCols);
    }

    generateMatrix(numRows, numCols) {
        const matrix = [];
        let n = 1;
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push(n++);
            }
            matrix.push(row);
        }
        return matrix;
    }

    get(row, col){
        return this.matrix[row][col]
    }

    alter(row,col,val){
        this.matrix[row][col] = val
    }

    print(){
        for(let i =0; i < this.numRows; i++){
            let line = ""
            for(let j = 0; j < this.numCols; j++){
                line += this.get(i,j) + "\t"
            }
            console.log(line)
        }
    }

    printColumn(colNum){
        for(let i = 0; i < this.numRows; i++){
            console.log(this.get(i,colNum))
        }
    }

    printRow(rowNum){
        for(let i = 0; i < this.matrix[0].length; i++){
            console.log(this.get(rowNum, i))
        }
    }

    findCoordinate(value){
        for(let i =0; i < this.numRows; i++){
            for(let j = 0; j < this.numCols; j++){
                if(this.get(i,j) === value){
                    return {
                        x: j,
                        y: i
                    }
                }
            }
        }
        console.log("value not in matrix")
    }
}



//You can paste the code from the lesson below to test your solution
// let m = new Matrix(3, 4)
// m.print()
// //prints
// /*
// 1       2       3       4
// 5       6       7       8
// 9       10      11      12
// */
    
// m.alter(0, 0, m.get(1, 1))
// m.printColumn(0) //prints 6, 5, 9 (separate lines)
// m.printRow(0) //prints 6, 2, 3, 4 (separate lines)

let m = new Matrix(3, 4)
// console.log(m.findCoordinate(12)) //prints {x: 3, y: 2}
// console.log(m.findCoordinate(7)) //prints {x: 2, y: 1}



/* Do not remove the exports below */
module.exports = Matrix