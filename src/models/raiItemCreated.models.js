const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


class raiItemCreated extends Model {}
raiItemCreated.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		rai_id: {
			type: DataTypes.INTEGER
		},
		received_qty: {
			type: DataTypes.FLOAT
		},
		receiving_advice: {
			type: DataTypes.INTEGER
		},
		line_no: {
			type: DataTypes.INTEGER
		}
	},
	{
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RAI_ITEM_CREATED',
	schema: 'vms',
	timestamps: false
	}
);
module.exports = raiItemCreated;
