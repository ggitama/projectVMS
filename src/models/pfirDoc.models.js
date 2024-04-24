const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const pfirDoc = sequelize.define('pfirDoc',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey:true
	},
	status: {
		type: DataTypes.STRING
	},
	po_id: {
		type: DataTypes.INTEGER
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PFIR_DOC',
	schema: 'vms',
	timestamps: false
  });

module.exports = pfirDoc;
