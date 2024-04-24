const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const storeList = sequelize.define('storeList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	kode_toko: {
		type: DataTypes.STRING
	},
	nama_toko: {
		type: DataTypes.STRING
	},
    gln: {
		type: DataTypes.STRING
	},
    search: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_STORE',
	schema: 'vms',
	timestamps: false
  });

module.exports = storeList;
