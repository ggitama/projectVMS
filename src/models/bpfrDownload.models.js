const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const bpfrDownload = sequelize.define('bpfrDownload',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		doc_no: {
			type: DataTypes.STRING
		},
		doc_type: {
			type: DataTypes.STRING
		},
		doc_date: {
			type: DataTypes.DATE
		},
		business_unit: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_name: {
			type: DataTypes.STRING
		},
		supplier_gln: {
			type: DataTypes.STRING
		},
		supp_address: {
			type: DataTypes.STRING
		},
		accounting_date: {
			type: DataTypes.DATE
		},
		vat_code: {
			type: DataTypes.STRING
		},
		npp_amount: {
			type: DataTypes.STRING
		},
		vat_amount: {
			type: DataTypes.STRING
		},
		total_amount: {
			type: DataTypes.STRING
		},
		payment_date: {
			type: DataTypes.DATE
		},
		tax_inv_no: {
			type: DataTypes.STRING
		},
		tax_inv_date: {
			type: DataTypes.DATE
		},		
		lgt_amount: {
			type: DataTypes.STRING
		},	
		cn_no: {
			type: DataTypes.STRING
		},
		retur_no: {
			type: DataTypes.STRING
		},	
		receive_no: {
			type: DataTypes.STRING
		},		
		operation_date: {
			type: DataTypes.DATE
		},	
		sysref: {
			type: DataTypes.STRING
		},		
		created_date: {
			type: DataTypes.DATE
		},		
		created_by: {
			type: DataTypes.STRING
		},		
		updated_date: {
			type: DataTypes.DATE
		},
		updated_by: {
			type: DataTypes.STRING
		},
		dept_code: {
			type: DataTypes.STRING
		},
		po_no: {
			type: DataTypes.STRING
		},
		site_code: {
			type: DataTypes.STRING
		},
		invoice_date: {
			type: DataTypes.DATE
		},
		due_date: {
			type: DataTypes.DATE
		},
		codeamt: {
			type: DataTypes.STRING
		},
		fee_code: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		},
		ignvatamtflag: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		download_date: {
			type: DataTypes.DATE
		},
		income_type: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.DATE
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		kwitansi_no: {
			type: DataTypes.STRING
		},
		supplier_taxid: {
			type: DataTypes.STRING
		},
	},
	{
		sequelize,
		tableName: 'trf_invoice',
		schema: 'vms',
		timestamps: false
	},
);

module.exports = bpfrDownload;
