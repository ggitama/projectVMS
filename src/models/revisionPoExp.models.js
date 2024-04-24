const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const revisionPoExp = sequelize.define('revisionPoExp',
	{
	// Define fields that match the columns in your view
	id : {
		type: DataTypes.STRING,
		primaryKey:true
	},
    po_no_poa: {
		type: DataTypes.STRING
	},
	status_poa: {
		type: DataTypes.STRING
	},
	order_date_poa: {
		type: DataTypes.DATE
	},
	pob_id: {
		type: DataTypes.STRING
	},
	po_no: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
	order_date: {
		type: DataTypes.DATE
	}
    }, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VIEW_REVISION_PO_EXP',
	schema: 'vms',
	timestamps: false
  });

module.exports = revisionPoExp;
