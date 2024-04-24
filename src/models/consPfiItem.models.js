const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consPfiItem = sequelize.define('consPfiItem',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},
	created_by: {
		type: DataTypes.STRING,
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
    barcode: {
		type: DataTypes.STRING
	},
    is_accepted: {
		type: DataTypes.CHAR
	},
    item_code: {
		type: DataTypes.STRING
	},
	item_name: {
		type: DataTypes.STRING
	},
    lgt_amount: {
		type: DataTypes.FLOAT
	},
    lgt_percentage: {
		type: DataTypes.FLOAT
	},
    line_no: {
		type: DataTypes.INTEGER
	},
    mcc_flag: {
		type: DataTypes.CHAR
	},
    remarks: {
		type: DataTypes.STRING
	},
	replaced: {
		type: DataTypes.CHAR
	},
	return_qty: {
		type: DataTypes.FLOAT,
	},
	sales_date: {
		type: DataTypes.DATE
	},
	sales_qty: {
		type: DataTypes.FLOAT
	},
    sales_type: {
		type: DataTypes.STRING
	},
    sales_unit: {
		type: DataTypes.INTEGER
	},
    selling_price: {
		type: DataTypes.FLOAT
	},
    sup_promo_amount: {
		type: DataTypes.FLOAT
	},
	sup_promo_rate: {
		type: DataTypes.FLOAT
	},
    sup_mcc_amount: {
		type: DataTypes.FLOAT
	},
    sup_mcc_rate: {
		type: DataTypes.FLOAT
	},
    total_base_con_margin: {
		type: DataTypes.FLOAT
	},
    total_base_con_payable: {
		type: DataTypes.FLOAT
	},
    total_con_payable: {
		type: DataTypes.FLOAT
	},
	total_return_amount: {
		type: DataTypes.FLOAT
	},
	total_sales_amount: {
		type: DataTypes.FLOAT
	},
    total_sup_promo_amount: {
		type: DataTypes.FLOAT
	},
    invoice_item: {
		type: DataTypes.INTEGER
	},
    pfi_cdt: {
		type: DataTypes.STRING
	},
	pfi_rev: {
		type: DataTypes.INTEGER
	},
    sup_payment_media_rate: {
		type: DataTypes.FLOAT
	},
	sup_payment_media_amount: {
		type: DataTypes.FLOAT
	},
	sup_payment_media: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'vms_con_pfi_item',
	schema: 'vms',
	timestamps: false
  });

module.exports = consPfiItem;
