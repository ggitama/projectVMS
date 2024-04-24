const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const suppRegList = sequelize.define('suppRegList',
	{
	// Define fields that match the columns in your view
	s_id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	kode_supplier: {
		type: DataTypes.STRING
	},
	nama_local: {
		type: DataTypes.STRING
	},
	id_pajak: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
	p2p: {
		type: DataTypes.STRING
	},
	search: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_REG_SUPPLIER_LIST',
	schema: 'vms',
	timestamps: false
  });

module.exports = suppRegList;
