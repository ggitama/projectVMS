const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const invCreated = sequelize.define('invCreated',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	po_no: {
		type: DataTypes.INTEGER
	},
	nature_code: {
		type: DataTypes.STRING
	},
    receive_date: {
		type: DataTypes.STRING
	},
    ship_to: {
		type: DataTypes.STRING
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
		type: DataTypes.STRING
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
	supplier_grp_id: {
		type: DataTypes.INTEGER
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
		type: DataTypes.INTEGER
	},
	business_unit: {
		type: DataTypes.INTEGER
	},
    accepted_date: {
		type: DataTypes.INTEGER
	},
    company_registration_number: {
		type: DataTypes.INTEGER
	},
	fax: {
		type: DataTypes.INTEGER
	},
	telephone: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.INTEGER
	},
	accept_reject_by: {
		type: DataTypes.INTEGER
	},
	sent_date: {
		type: DataTypes.STRING
	},
	ima_sent_date: {
		type: DataTypes.DATE
	},
    etax_status: {
		type: DataTypes.STRING
	},
    flag_status: {
		type: DataTypes.STRING
	},
	orig_tax_invoice_date: {
		type: DataTypes.INTEGER
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
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_INV_CREATED',
	schema: 'vms',
	timestamps: false
  });

module.exports = invCreated;
