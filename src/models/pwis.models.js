const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const pwis = sequelize.define('pwis',
	{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	store_name: {
		type: DataTypes.STRING
	},
	store_code: {
		type: DataTypes.STRING
	},
  	}, 
  {
	timestamps: false,
		sequelize,
		modelName: 'pp_ws_item_store',
		tableName: 'pp_ws_item_store',
		schema: 'vms'
  });

module.exports = pwis;
