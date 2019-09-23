
class Matrix {
  constructor(rows, columns) {
    this.matrix = this.generateMatrix(rows, columns)
  }

  generateMatrix(numRows, numColumns) {
    let matrix = []
    let num = 1

    for (let r = 0; r < numRows; r++) {
      matrix.push([])

      for (let c = 0; c < numColumns; c++) {
        matrix[r].push(num++)
      }
    }

    return matrix
  }

  alter(r, c, val) {
    this.matrix[r][c] = val
  }

  print() {
    for (let i = 0; i < this.matrix.length; i++) {
      let row = ""

      for (let j = 0; j < this.matrix[i].length; j++) {
        row += this.matrix[i][j] + "\t"
      }

      console.log(row)
    }
  }

  printColumn(c) {
    for (let i = 0; i < this.matrix.length; i++) {
      console.log(this.matrix[i][c])
    }
  }

  printRow(r) {
    for (let i = 0; i < this.matrix[r].length; i++) {
      console.log(this.matrix[r][i])
    }
  }

  get(r, c) {
    return this.matrix[r][c]
  }

  //EXERCISE 2
  findCoordinate(value) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {

        if (this.matrix[i][j] === value) {
          return { x: j, y: i }
        }

      }
    }
  }
}




//You can paste the code from the lesson below to test your solution
let m = new Matrix(5, 6)
m.print()
//prints
/*
1       2       3       4
5       6       7       8
9       10      11      12
*/

m.alter(0, 0, m.get(1, 1))
m.printColumn(0) //prints 6, 5, 9 (separate lines)
m.printRow(0) //prints 6, 2, 3, 4 (separate lines)




/* Do not remove the exports below */
module.exports = Matrix