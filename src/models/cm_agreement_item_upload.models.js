const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class caiu extends Model {}
caiu.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement:true
		},
		agreement_item_code: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		discount_type: {
			type: DataTypes.STRING
		},
		discount_value: {
			type: DataTypes.FLOAT
		},
		family_filter_code: {
			type: DataTypes.STRING
		},
		item_code: {
			type: DataTypes.STRING
		},
		item_name: {
			type: DataTypes.STRING
		},
		max_quantity: {
			type: DataTypes.FLOAT
		},
		normal_quantity: {
			type: DataTypes.FLOAT
		},
		promo_quantity: {
			type: DataTypes.FLOAT
		},
		promotion_type: {
			type: DataTypes.STRING
		},
		remark: {
			type: DataTypes.STRING
		},
		retur_item: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		},
		discount_percent: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement_item_upload',
		tableName: 'cm_agreement_item_upload',
		schema: 'vms'
	}
);

module.exports = caiu;
