const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


class pfiic extends Model {}
pfiic.init(
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
		}
	},
	{
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PFII_CREATED',
	schema: 'vms',
	timestamps: false
	}
);
module.exports = pfiic;
