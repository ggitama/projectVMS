const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


class pfirInvItemC extends Model {}
pfirInvItemC.init(
	{
		poi_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		rai_id: {
			type: DataTypes.STRING
		},
		receiving_advice: {
			type: DataTypes.INTEGER
		},
		received_qty: {
			type: DataTypes.STRING
		},
		order_qty: {
			type: DataTypes.DATE
		},
		unit_price: {
			type: DataTypes.FLOAT
		},
		pfii_id: {
			type: DataTypes.INTEGER
		},
		pro_forma_invoice: {
			type: DataTypes.INTEGER
		},
		pro_forma_invoice_response: {
			type: DataTypes.INTEGER
		},
		pro_forma_invoice_response: {
			type: DataTypes.INTEGER
		}
	},
	{
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PFIR_INVITEM_CREATED',
	schema: 'vms',
	timestamps: false
	}
);
module.exports = pfirInvItemC;
