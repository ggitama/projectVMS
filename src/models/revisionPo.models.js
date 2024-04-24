const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const revisionPo = sequelize.define('revisionPo',
	{
	// Define fields that match the columns in your view
	poa_id : {
		type: DataTypes.STRING
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
	id: {
		type: DataTypes.STRING,
		primaryKey:true
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
	tableName: 'VIEW_REVISION_PO',
	schema: 'vms',
	timestamps: false
  });

module.exports = revisionPo;
