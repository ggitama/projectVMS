const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consNotaReturDownload = sequelize.define('consNotaReturDownload',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	pfi_number: {
		type: DataTypes.STRING
	},
	pfi_date: {
		type: DataTypes.DATE
	},
	store_code: {
		type: DataTypes.STRING
	},
	store_name: {
		type: DataTypes.STRING
	},
	retur_number: {
		type: DataTypes.STRING
	},
	tax_inv_pengacu: {
		type: DataTypes.STRING
	},
	tax_inv_pengacu_date: {
		type: DataTypes.DATE
	},
	business_unit_code: {
		type: DataTypes.STRING
	},
	business_unit: {
		type: DataTypes.STRING
	},
	business_unit_address: {
		type: DataTypes.STRING
	},
	business_unit_npwp: {
		type: DataTypes.STRING
	},
	business_unit_npkp: {
		type: DataTypes.STRING
	},
    supplier_code: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
    supplier_address: {
		type: DataTypes.STRING
	},
    supplier_npwp: {
		type: DataTypes.STRING
	},
    supplier_npkp: {
		type: DataTypes.STRING
	},
    item_code: {
		type: DataTypes.STRING
	},
    item_name: {
		type: DataTypes.STRING
	},
    qty: {
		type: DataTypes.STRING
	},
    unit_price: {
		type: DataTypes.STRING
	},
    total_price: {
		type: DataTypes.STRING
	},
    vat: {
		type: DataTypes.STRING
	},
    signature: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
    download_date: {
		type: DataTypes.DATE
	},
    posting_date: {
		type: DataTypes.DATE
	},
    created_date: {
		type: DataTypes.STRING
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'nota_retur_cons',
	schema: 'vms',
	timestamps: false
  });

module.exports = consNotaReturDownload;
