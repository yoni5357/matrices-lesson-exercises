const Matrix = require('./Matrix')


class EmployeeMatrix extends Matrix {
  constructor() {
    super()
  }

  //Exercise 3
  loadData(salaryData) {
    for (let salary of salaryData) {
      this.matrix.push([salary._id, salary.name, salary.department, salary.salary])
    }
  }

  //EXERCISE 4
  getEmployees(department) {
    let employeeNames = []

    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i][2] === department ? employeeNames.push(this.matrix[i][1]) : null
    }

    return employeeNames
  }

  //EXERCISE 5
  getTotalSalary(department) {
    let sum = 0

    for (let i = 0; i < this.matrix.length; i++) {
      this.matrix[i][2] === department ? sum += this.matrix[i][3] : null
    }

    return sum
  }

  //EXERCISE 6
  findRichest() {

    let highestSalary = 0
    let name = ''

    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i][3] > highestSalary) {
        name = this.matrix[i][1]
        highestSalary = this.matrix[i][3]
      }
    }

    return name
  }
}




//You can paste the code from the lesson below to test your solution




/* Do not remove the exports below */
module.exports = EmployeeMatrix