const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const nrDownload = sequelize.define('nrDownload',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		rc_number: {
			type: DataTypes.STRING
		},
		rc_date: {
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
			type: DataTypes.DATE
		},
	},
	{
		sequelize,
		tableName: 'nota_retur',
		schema: 'vms',
		timestamps: false
	},
);

module.exports = nrDownload;
