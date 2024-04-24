const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class PO extends Model {}

PO.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			autoIncrement: true
		},
		delivery_to_local: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		isactive: {
			type: DataTypes.STRING
		},
		created_by: {
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
		country_code: {
			type: DataTypes.STRING
		},
		currency_order: {
			type: DataTypes.STRING
		},
		currency_symbol: {
			type: DataTypes.STRING
		},
		delivery_to: {
			type: DataTypes.STRING
		},
		dept_code: {
			type: DataTypes.STRING
		},
		department_name: {
			type: DataTypes.STRING
		},
		expected_delivery_date: {
			type: DataTypes.STRING
		},
		ext_po_no: {
			type: DataTypes.STRING
		},
		order_date: {
			type: DataTypes.DATE
		},
		po_no: {
			type: DataTypes.STRING
		},
		sender_code: {
			type: DataTypes.STRING
		},
		ship_to: {
			type: DataTypes.STRING
		},
		ship_to_code: {
			type: DataTypes.STRING
		},
		source_file: {
			type: DataTypes.STRING
		},
		source_flag: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		store_order_number: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		suppliereancode: {
			type: DataTypes.STRING
		},
		supplier_fax_number: {
			type: DataTypes.STRING
		},
		supplier_name: {
			type: DataTypes.STRING
		},
		supplier_name_local: {
			type: DataTypes.STRING
		},
		supplier_phone: {
			type: DataTypes.STRING
		},
		total_amount: {
			type: DataTypes.FLOAT
		},
		total_quantity: {
			type: DataTypes.FLOAT
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		date_updated: {
			type: DataTypes.DATE
		},
		supplier_grp_id: {
			type: DataTypes.INTEGER
		},
		supplier_department: {
			type: DataTypes.INTEGER
		},
		c4bugln: {
			type: DataTypes.STRING
		},
		notification_count: {
			type: DataTypes.INTEGER
		},
		sales_start_date: {
			type: DataTypes.DATE
		},
		sales_end_date: {
			type: DataTypes.DATE
		},
		revision_from: {
			type: DataTypes.STRING
		},
		revision_to: {
			type: DataTypes.STRING
		},
		business_unit_name: {
			type: DataTypes.STRING
		},
		business_unit_address: {
			type: DataTypes.STRING
		},
		business_unit_registration: {
			type: DataTypes.STRING
		},
		business_unit_code: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'purchase_order',
		tableName: 'purchase_order',
		schema: 'vms'
	}
);

module.exports = PO;


