const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('my_class', 'ira', 'reboot', {
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

module.exports = {
  dbConnect
}