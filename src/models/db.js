const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vmsdev', 'postgres', '', {
	host: '10.21.3.36',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	  }
	// logging: false
});
//sequelize.options.logging = false;

module.exports = sequelize;
