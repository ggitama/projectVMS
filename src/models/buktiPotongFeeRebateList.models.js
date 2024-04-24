const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const bpfrList = sequelize.define('bpfrList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	nomor_invoice: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
	invoice_date: {
		type: DataTypes.DATE
	},
    download_date: {
		type: DataTypes.DATE
	},
	status: {
		type: DataTypes.STRING
	},
    business_unit: {
		type: DataTypes.INTEGER
	},
    supplier: {
		type: DataTypes.STRING
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
	income_type: {
		type: DataTypes.STRING
	},
	kwitansi_no: {
		type: DataTypes.STRING
	},
	supplier_taxid: {
		type: DataTypes.STRING
	},
	business_unit_name: {
		type: DataTypes.STRING
	},
	business_unit_address: {
		type: DataTypes.STRING
	},
	
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_BUKTI_POTONG_FEE_REBATE2',
	schema: 'vms',
	timestamps: false
  });

module.exports = bpfrList;
