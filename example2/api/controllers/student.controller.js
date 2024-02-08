const Student = require("../models/student.model")

const sayHi = (req, res) => {
  console.log('Me ha llegado la petición al back!')
  res.send("Mensajito que envío al Postman");
}

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll()
    res.send(students)
  } catch (error) {
    console.error(error)
    res.send('Error getting all students: ', error)
  }
}

const createStudent = async (req, res) => {
  try {
    const dataInBody = req.body
    const newStudent = await Student.create(dataInBody)
    res.send(newStudent)
  } catch (error) {
    console.error(error)
    res.send('Error creating new student: ', error)
  }
}

module.exports = {
  sayHi,
  getAllStudents,
  createStudent
};