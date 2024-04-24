const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class supplierDetail extends Model {}
supplierDetail.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created_by: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.STRING
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		b2b: {
			type: DataTypes.CHAR
		},
		boarded: {
			type: DataTypes.CHAR
		},
		english_name: {
			type: DataTypes.STRING
		},
		fax_number: {
			type: DataTypes.STRING
		},
		local_name: {
			type: DataTypes.STRING
		},
		phone_number: {
			type: DataTypes.STRING
		},
		stop_business_date: {
			type: DataTypes.DATE
		},
		stop_business_reason: {
			type: DataTypes.STRING
		},
		stop_payment_end_date: {
			type: DataTypes.DATE
		},
		stop_payment_reason: {
			type: DataTypes.STRING
		},
		stop_payment_start_date: {
			type: DataTypes.DATE
		},
		supplier_code: {
			type: DataTypes.STRING,
			// primaryKey: true
		},
		supplier_type: {
			type: DataTypes.STRING
		},
		tax_id: {
			type: DataTypes.STRING
		},
		transferred_topsdate: {
			type: DataTypes.DATE
		},
		mversion: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'supplier_detail',
		tableName: 'supplier_detail',
		schema: 'vms'
	}
);

module.exports = supplierDetail;
