const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consPfi = sequelize.define('consPfi',
	{
		invoice_id: {
			type: DataTypes.STRING,
		},
		total_gross_amount: {
			type: DataTypes.INTEGER
		},
		total_luxury_amount: {
			type: DataTypes.STRING
		},
		total_vat_amount: {
			type: DataTypes.STRING
		},
		total_net_amount: {
			type: DataTypes.INTEGER
		},
		total_tax_amount: {
			type: DataTypes.INTEGER
		},
		vendor_id: {
			type: DataTypes.STRING
		},
		voucher_id_in_source: {
			type: DataTypes.STRING
		},
		mversion: {
			type: DataTypes.STRING
		},
		city: {
			type: DataTypes.STRING
		},
		company_address1: {
			type: DataTypes.STRING
		},
		company_address2: {
			type: DataTypes.STRING
		},
		company_name: {
			type: DataTypes.STRING
		},
		country: {
			type: DataTypes.STRING
		},
		dept_code: {
			type: DataTypes.STRING
		},
		ima_processed: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		peoplesoft_amount: {
			type: DataTypes.STRING
		},
		postal_code: {
			type: DataTypes.STRING
		},
		purchase_price_correction: {
			type: DataTypes.STRING
		},
		revision: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		tax_invoice_date: {
			type: DataTypes.STRING
		},
		tax_serial_number: {
			type: DataTypes.STRING
		},
		vat_correction: {
			type: DataTypes.STRING
		},
		purchase_order: {
			type: DataTypes.STRING
		},
		business_unit: {
			type: DataTypes.INTEGER
		},
		accepted_date: {
			type: DataTypes.STRING
		},
		company_registration_number: {
			type: DataTypes.STRING
		},
		fax: {
			type: DataTypes.STRING
		},
		telephone: {
			type: DataTypes.FLOAT
		},
		email: {
			type: DataTypes.STRING
		},
		accept_reject_by: {
			type: DataTypes.STRING
		},
		sent_date: {
			type: DataTypes.STRING
		},
		ima_sent_date: {
			type: DataTypes.STRING
		},
		is_retracted: {
			type: DataTypes.STRING
		},
		etax_status: {
			type: DataTypes.STRING
		},
		flag_status: {
			type: DataTypes.DATE
		},
		orig_tax_invoice_date: {
			type: DataTypes.DATE
		},
		pfi_cdt: {
			type: DataTypes.STRING
		},
		pfi_rev: {
			type: DataTypes.INTEGER
		},
		scan2_receive_date: {
			type: DataTypes.STRING
		},
		cdt: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		sequelize,
	tableName: 'VMS_CONSPFI_CREATED1',
	schema: 'vms',
	timestamps: false
	},
);

module.exports = consPfi;
