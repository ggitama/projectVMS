const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const worksheet = sequelize.define('worksheet',
	{
	// Define fields that match the columns in your view
	worksheet_no: {
		type: DataTypes.INTEGER,
		primaryKey:true
	},
	tanggal_buat: {
		type: DataTypes.DATE
	},
	supplier_code: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
    dept_code: {
		type: DataTypes.INTEGER,
	},
    submission_date: {
		type: DataTypes.DATE
	},
    purchase_effective_date: {
		type: DataTypes.DATE
	},
	status: {
		type: DataTypes.STRING
	},
	sent_date: {
		type: DataTypes.STRING
	},
    department: {
		type: DataTypes.STRING
	},
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_WORKSHEET_LIST',
	schema: 'vms',
	timestamps: false
  });

module.exports = worksheet;
