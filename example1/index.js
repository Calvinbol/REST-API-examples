// TENER TODO EL CÓDIGO EN UN MISMO FICHERO RESULTA INVIABLE


// Conexión con la base de datos
require('dotenv').config({path: '../.env'})
const { Sequelize } = require('sequelize')
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

async function checkDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection succesful')
  } catch (error) {
    console.log(error)
  }
}

async function syncModels () {
  try {
    await sequelize.sync({ alter: true })
    console.log('Models Synchronized!')
  } catch (error) {
    console.log(error)
  }
}

async function dbConnect() {
  try {
    await checkDB()
    await syncModels()
  } catch (error) {
    console.log(error)
  }
}

// Modelos
const Student = sequelize.define('student', {
  name: {
    type: DataTypes.STRING
  },
  age: {
		type: DataTypes.INTEGER,
	},
  fav_pokemon: {
		type: DataTypes.STRING
	}
},
{
  timestamps: false
})

// Iniciar la escucha del back a las peticiones del front
const express = require('express')
const morgan = require("morgan");

const app = express()
const port = 3000

app.listen(port, async () => {
  await dbConnect()
  console.log(`--> Servidor arrancado en puerto ${port}`)
})

app.use(express.json())
app.use(morgan("dev"));
app.use(express.static("public"));

// Comportamiento de la API
app.get("/hola", (req, res) => {
  console.log('Me ha llegado la petición al back!')
  res.send("Mensajito que envío al Postman");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.findAll()
    res.send(students)
  } catch (error) {
    console.error(error)
    res.send('Error getting all students: ', error)
  }
});

app.post("/students", async (req, res) => {
  try {
    const dataInBody = req.body
    const newStudent = await Student.create(dataInBody)
    res.send(newStudent)
  } catch (error) {
    console.error(error)
    res.send('Error creating new student: ', error)
  }
});