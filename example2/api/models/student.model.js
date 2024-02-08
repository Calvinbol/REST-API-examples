const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index')

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

module.exports = Student