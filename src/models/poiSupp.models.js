
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');

class poiSupp extends Model {}
poiSupp.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		// url: {
		// 	type: DataTypes.STRING
		// },
		line_no: {
			type: DataTypes.DATE
		},
		sub_code: {
			type: DataTypes.STRING
		},
		unit_code: {
			type: DataTypes.DATE
		},
		capacity: {
			type: DataTypes.INTEGER
		},
		barcode: {
			type: DataTypes.FLOAT
		},
		item_name: {
			type: DataTypes.FLOAT
		},
		sub_code_name: {
			type: DataTypes.FLOAT
		},
		order_qty_in_pack: {
			type: DataTypes.FLOAT
		},
		purchase_price_type: {
			type: DataTypes.INTEGER
		},
		free_qty_insku: {
			type: DataTypes.INTEGER
		},
		qty_per_pack: {
			type: DataTypes.FLOAT
		},
		unit_price: {
			type: DataTypes.FLOAT
		},
		supplier_code: {
			type: DataTypes.STRING
		}
	},
	{
		sequelize,
		tableName: 'VMS_POI_SUPPLIER',
		schema: 'vms',
		timestamps: false
  });

module.exports = poiSupp;
