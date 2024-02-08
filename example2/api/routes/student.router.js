const router = require('express').Router()

const { 
  sayHi,
  getAllStudents,
  createStudent
} = require('../controllers/student.controller')

router.get('/', getAllStudents)
router.get('/hola', sayHi)
router.post("/", createStudent);

module.exports = router