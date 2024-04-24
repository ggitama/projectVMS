
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const poi = require('./poItem.models.js');
const pfii = require('./proformaInvoiceItem.models.js');

class rai extends Model {}
rai.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			//autoIncrement: true
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
		free_qty_received: {
			type: DataTypes.FLOAT
		},
		itemeancode: {
			type: DataTypes.STRING
		},
		item_reference_no: {
			type: DataTypes.STRING
		},
		net_purchase_price: {
			type: DataTypes.FLOAT
		},
		order_date: {
			type: DataTypes.DATE
		},
		order_qty: {
			type: DataTypes.FLOAT
		},
		received_date: {
			type: DataTypes.DATE
		},
		received_qty: {
			type: DataTypes.FLOAT
		},
		receiving_advice_number: {
			type: DataTypes.STRING
		},
		reference_order_number: {
			type: DataTypes.STRING
		},
		remaining_qty: {
			type: DataTypes.FLOAT
		},
		ship_to_code: {
			type: DataTypes.STRING
		},
		source_flag: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		units_per_case: {
			type: DataTypes.FLOAT,
		},
		mversion: {
			type: DataTypes.INTEGER,
		},
		line_no: {
			type: DataTypes.INTEGER
		},
		dispatch_advice_item: {
			type: DataTypes.INTEGER
		},
		purchase_order_item: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		receiving_advice: {
			type: DataTypes.INTEGER
		},
		is_revised: {
			type: DataTypes.STRING
		},
		remarks:{
			type: DataTypes.STRING
		}
		
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'receiving_advice_item',
		tableName: 'receiving_advice_item',
		schema: 'vms'
	},
);
rai.hasMany(pfii, {as:'raipfii', foreignKey: 'receiving_advice_item' });
pfii.belongsTo(pfii, { as:'pfiirai', foreignKey: 'receiving_advice_item' });

module.exports = rai;
