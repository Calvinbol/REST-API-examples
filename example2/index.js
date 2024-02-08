const { dbConnect } = require('./db/index.js')
const express = require('express')
const morgan = require("morgan");

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"));

app.listen(port, async () => {
  await dbConnect()
  console.log(`--> Servidor arrancado en puerto ${port}`)
})

app.use('/api', require('./api/routes/index.js'))
