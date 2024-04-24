const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class rri extends Model {}
rri.init({
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
		accepted: {
			type: DataTypes.STRING
		},
		item_barcode: {
			type: DataTypes.DATE
		},
		item_code: {
			type: DataTypes.STRING
		},
		item_name: {
			type: DataTypes.STRING
		},
		line_no: {
			type: DataTypes.STRING
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
			type: DataTypes.STRING
		},
		return_request_quantity: {
			type: DataTypes.STRING
		},
		return_request_unit_price: {
			type: DataTypes.DATE
		},
		vat_rate: {
			type: DataTypes.STRING
		},
		ret: {
			type: DataTypes.STRING,
			foreignKey: true
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'return_request_item',
		tableName: 'return_request_item',
		schema: 'vms'
	}
);

module.exports = rri;
