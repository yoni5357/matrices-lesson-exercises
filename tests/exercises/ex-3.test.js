let EmployeeMatrix

try {
    EmployeeMatrix = require('../../src/EmployeeMatrix')
} catch (error) {
    console.log("i")
}

describe('exercise3', () => {
    it(`should create a method 'findCoordinate' in your matrix which receives a value and returns the coordinate of that value' `, function () {
        let salaryData = [
            { _id: "e10021", name: "Gillian", department: "Finance", salary: 2000 },
            { _id: "e10725", name: "Tibor", department: "Design", salary: 1200 },
            { _id: "e10041", name: "Anisha", department: "Finance", salary: 2300 },
            { _id: "e10411", name: "Jakub", department: "Design", salary: 1600 },
            { _id: "e11995", name: "Mar", department: "Design", salary: 1300 },
            { _id: "e10732", name: "Nisha", department: "Design", salary: 1200 }
        ]

        const em = new EmployeeMatrix()
        em.loadData(salaryData)

        let result = em.get(2, 2)
        expect(result, `when loading the salaryData to the matrix - running 'get(2, 2)' should return the string 'Finance' instead got ${result}`).toBe('Finance')

        result = em.get(1, 3)
        expect(result, `when loading the salaryData to the matrix - running 'get(1, 3)' should return the string 1200 instead got ${result}`).toBe(1200)
    })
})
