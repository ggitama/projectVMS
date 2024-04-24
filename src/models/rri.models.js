
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');
const poi = require('./poItem.models.js');
const store = require('./store.models.js');
const supplier = require('./supplier.models.js');

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
			type: DataTypes.DATE
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		is_accepted: {
			type: DataTypes.CHAR
		},
		line_no: {
			type: DataTypes.INTEGER
		},
		original_qty: {
			type: DataTypes.FLOAT
		},
		received_qty: {
			type: DataTypes.FLOAT
		},
		remarks: {
			type: DataTypes.STRING
		},
		dispatch_advice_item: {
			type: DataTypes.INTEGER
		},
		purchase_order_item: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		receiving_advice_response: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		is_revised: {
			type: DataTypes.CHAR
		},
		litigated: {
			type: DataTypes.CHAR
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'ra_resp_item',
		tableName: 'ra_resp_item',
		schema: 'vms'
	},
	
);

poi.hasMany(poi, {as:'poirai', foreignKey: 'purchase_order_item' });
rri.belongsTo(poi, { as:'raipoii', foreignKey: 'purchase_order_item' });

module.exports = rri;
