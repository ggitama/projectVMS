const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const businessUnitList = sequelize.define('businessUnitList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	kode: {
		type: DataTypes.STRING
	},
	nama: {
		type: DataTypes.STRING
	},
    alamat: {
		type: DataTypes.STRING
	},
    registrasi: {
		type: DataTypes.STRING
	},
    setid: {
		type: DataTypes.STRING
	},
    search: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_BUSINESS_UNIT',
	schema: 'vms',
	timestamps: false
  });

module.exports = businessUnitList;
