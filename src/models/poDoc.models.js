const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const poDoc = sequelize.define('poDoc',
	{
	// Define fields that match the columns in your view
	po_id: {
		type: DataTypes.STRING,
		primaryKey: true
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PO_DOC',
	schema: 'vms',
	timestamps: false
  });

module.exports = poDoc;
