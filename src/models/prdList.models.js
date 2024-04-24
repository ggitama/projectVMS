const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const prdList = sequelize.define('prdList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	tanggal_pembayaran: {
		type: DataTypes.DATE
	},
	payment_refrensi: {
		type: DataTypes.STRING
	},
	harga: {
		type: DataTypes.INTEGER
	},
    merchant: {
		type: DataTypes.STRING
	},
    status: {
		type: DataTypes.STRING
	},
    supplier_code: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PAYMENT_REFERENCE_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = prdList;
