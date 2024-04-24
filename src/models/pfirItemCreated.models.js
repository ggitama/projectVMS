const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


class pfirItemCreated extends Model {}
pfirItemCreated.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		reconciled: {
			type: DataTypes.FLOAT
		},
		unit_price: {
			type: DataTypes.FLOAT
		},
		pro_forma_invoice: {
			type: DataTypes.INTEGER
		}
	},
	{
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PFIR_ITEM_CREATED',
	schema: 'vms',
	timestamps: false
	}
);
module.exports = pfirItemCreated;
