const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const departmentList = sequelize.define('departmentList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	kode_departemen: {
		type: DataTypes.STRING
	},
	nama_departemen: {
		type: DataTypes.STRING
	},
    departemen_nama_lokal: {
		type: DataTypes.STRING
	},
    perubahan_terakhir: {
		type: DataTypes.STRING
	},
    search: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_DEPARTMENTS',
	schema: 'vms',
	timestamps: false
  });

module.exports = departmentList;
