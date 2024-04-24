
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');

class piri extends Model {}
piri.init({
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
			type: DataTypes.STRING
		},
		pro_forma_invoice_response: {
			type: DataTypes.INTEGER
		},
		receiving_advice_item: {
			type: DataTypes.INTEGER
		},
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'pfi_inv_resp_item',
		tableName: 'pfi_inv_resp_item',
		schema: 'vms'
	},
);

module.exports = piri;
