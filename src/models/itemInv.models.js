
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');

class itemInv extends Model {}
itemInv.init({
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
		luxury_tax_percentage: {
			type: DataTypes.FLOAT
		},
		tax_percentage: {
			type: DataTypes.FLOAT
		},
		total_qty: {
			type: DataTypes.FLOAT
		},
		unit_price: {
			type: DataTypes.FLOAT
		},
		invoice: {
			type: DataTypes.INTEGER
		},
		purchase_order_item: {
			type: DataTypes.INTEGER
		},
		c_item_barcode: {
			type: DataTypes.STRING
		},
		c_item_code: {
			type: DataTypes.STRING
		},
		c_item_name: {
			type: DataTypes.STRING
		},
		c_line_no: {
			type: DataTypes.INTEGER
		},
		c_tot_base_con_margin: {
			type: DataTypes.FLOAT
		},
		c_tot_base_con_payable: {
			type: DataTypes.FLOAT
		},
		c_tot_con_payable_amt: {
			type: DataTypes.FLOAT
		},
		c_ven_promo_support_amt: {
			type: DataTypes.FLOAT
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'invoice_item',
		tableName: 'invoice_item',
		schema: 'vms'
	},
);

module.exports = itemInv;
