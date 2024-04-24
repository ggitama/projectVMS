const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class rrir extends Model {}
rrir.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement:true
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
		accepted: {
			type: DataTypes.STRING
		},
		item_barcode: {
			type: DataTypes.STRING
		},
		item_code: {
			type: DataTypes.STRING
		},
		item_name: {
			type: DataTypes.STRING
		},
		line_no: {
			type: DataTypes.INTEGER
		},
		remark: {
			type: DataTypes.STRING
		},
		return_reason_code: {
			type: DataTypes.STRING
		},
		return_reason_desc: {
			type: DataTypes.STRING
		},
		return_request_amount: {
			type: DataTypes.FLOAT
		},
		return_request_quantity: {
			type: DataTypes.FLOAT
		},
		return_request_unit_price: {
			type: DataTypes.FLOAT
		},
		vat_rate: {
			type: DataTypes.FLOAT
		},
		rq_item_id: {
			type: DataTypes.INTEGER
		},
		rqr_id: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'return_request_item_response',
		tableName: 'return_request_item_response',
		schema: 'vms'
	}
);

module.exports = rrir;
