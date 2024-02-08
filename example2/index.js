const { dbConnect } = require('./db')
const express = require('express')
const morgan = require("morgan");
//const router = require('./api/routes/index.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"));
app.use(express.static("public"));

app.listen(port, async () => {
  await dbConnect()
  console.log(`--> Servidor arrancado en puerto ${port}`)
})