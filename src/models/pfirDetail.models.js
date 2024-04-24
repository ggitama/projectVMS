const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const pfirDetail = sequelize.define('pfirDetail',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey:true
	},
	piri_id: {
		type: DataTypes.INTEGER
	},
	item_code: {
		type: DataTypes.STRING
	},
    sub_code: {
		type: DataTypes.STRING
	},
    unit_code: {
		type: DataTypes.STRING
	},
    capacity: {
		type: DataTypes.STRING
	},
    barcode: {
		type: DataTypes.STRING
	},
    item_name: {
		type: DataTypes.STRING
	},
    order_qty_insku: {
		type: DataTypes.FLOAT
	},
    unit_price: {
		type: DataTypes.FLOAT
	},
    is_accepted: {
		type: DataTypes.STRING
	},
    reconciled: {
		type: DataTypes.FLOAT
	},
    remarks: {
		type: DataTypes.STRING
	},
	url: {
	type: DataTypes.STRING
}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PFIR_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = pfirDetail;
