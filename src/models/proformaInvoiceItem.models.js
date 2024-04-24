
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');

class pfii extends Model {}
pfii.init({
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
		original_price: {
			type: DataTypes.FLOAT
		},
		reconciled: {
			type: DataTypes.FLOAT
		},
		remarks: {
			type: DataTypes.STRING
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		is_accepted: {
			type: DataTypes.CHAR
		},
		pro_forma_invoice: {
			type: DataTypes.INTEGER
		},
		receiving_advice_item: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'pro_forma_invoice_item',
		tableName: 'pro_forma_invoice_item',
		schema: 'vms'
	},
);

module.exports = pfii;
