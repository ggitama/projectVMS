const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const rc = require('./returConfirmation.models.js');

class rci extends Model {}
rci.init({
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
		item_code: {
			type: DataTypes.STRING
		},
		return_reason_code: {
			type: DataTypes.STRING
		},
		return_reason_desc: {
			type: DataTypes.STRING
		},
		return_request_amount: {
			type: DataTypes.INTEGER
		},
		return_request_quantity: {
			type: DataTypes.INTEGER
		},
		return_request_unit_price: {
			type: DataTypes.INTEGER
		},
		vat_rate: {
			type: DataTypes.INTEGER
		},
		rtnconfirm: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		line_no: {
			type: DataTypes.INTEGER
		},
		item_name: {
			type: DataTypes.STRING
		},
		item_barcode: {
			type: DataTypes.STRING
		},
		vat_amount: {
			type: DataTypes.INTEGER
		},
		vat_code: {
			type: DataTypes.STRING
		},
		return_price: {
			type: DataTypes.INTEGER
		},
		return_amount: {
			type: DataTypes.INTEGER
		},
		accepted: {
			type: DataTypes.STRING
		},
		remark: {
			type: DataTypes.STRING
		},
		rtnrequest: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'return_confirmation_item',
		tableName: 'return_confirmation_item',
		schema: 'vms'
	}
);

// rci.belongsTo(rc, { foreignKey: 'rtnconfirm' });
// rc.hasMany(rc, { foreignKey: 'id' });
module.exports = rci;
