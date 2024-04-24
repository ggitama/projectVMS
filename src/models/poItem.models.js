const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const rai = require('./receivingAdviceItem.models.js');
class poi extends Model {}

poi.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
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
		barcode: {
			type: DataTypes.STRING
		},
		capacity: {
			type: DataTypes.STRING
		},
		free_qty_insku: {
			type: DataTypes.INTEGER
		},
		internal_reference_number: {
			type: DataTypes.STRING
		},
		item_code: {
			type: DataTypes.STRING
		},
		item_name: {
			type: DataTypes.STRING
		},
		item_name_local: {
			type: DataTypes.STRING
		},
		line_no: {
			type: DataTypes.INTEGER
		},
		measurement_unit: {
			type: DataTypes.STRING
		},
		order_by: {
			type: DataTypes.STRING
		},
		order_qty_in_pack: {
			type: DataTypes.INTEGER
		},
		order_qty_insku: {
			type: DataTypes.INTEGER
		},
		purchase_price_type: {
			type: DataTypes.STRING
		},
		qty_per_pack: {
			type: DataTypes.INTEGER
		},
		qty_per_sales_pack: {
			type: DataTypes.INTEGER
		},
		sub_code: {
			type: DataTypes.STRING
		},
		sub_code_name: {
			type: DataTypes.STRING
		},
		sub_code_name_local: {
			type: DataTypes.STRING
		},
		unit_code: {
			type: DataTypes.STRING
		},
		unit_price: {
			type: DataTypes.INTEGER
		},
		vat_code: {
			type: DataTypes.STRING
		},
		vat_rate: {
			type: DataTypes.INTEGER
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		purchase_order: {
			type: DataTypes.STRING,
			primaryKey: true,
			foreignKey: true
		}
	},
	{
		sequelize,
		modelName: 'purchase_order_item',
		tableName: 'purchase_order_item',
		schema: 'vms'
	}
);
rai.belongsTo(rai, {as:'poirai', foreignKey: 'purchase_order_item' });
poi.hasMany(rai, { as:'raipoi', foreignKey: 'purchase_order_item' });




module.exports = poi;
