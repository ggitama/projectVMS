const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class rrr extends Model {}
rrr.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
		c4business_unit: {
			type: DataTypes.INTEGER
		},
		dc_vendor_code: {
			type: DataTypes.STRING
		},
		dept_code: {
			type: DataTypes.STRING
		},
		ext_ref_no: {
			type: DataTypes.STRING
		},
		request_total_amount: {
			type: DataTypes.FLOAT
		},
		return_request_number: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_id: {
			type: DataTypes.INTEGER
		},
		return_request: {
			type: DataTypes.INTEGER
		},
		rtn_request_date: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.STRING
		},
		remarks: {
			type: DataTypes.STRING
		},
		organization_unit: {
			type: DataTypes.STRING
		},
		pick_up_location: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'return_request_response',
		tableName: 'return_request_response',
		schema: 'vms'
	}
);

module.exports = rrr;
