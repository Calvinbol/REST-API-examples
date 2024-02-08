const router = require('express').Router()
const studentRouter = require('./student.router.js');

router.use('/students', studentRouter)

module.exports = router