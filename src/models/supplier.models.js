const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');
const supplierDetail = require('./supplierDetail.models');


class supplier extends Model {}
supplier.init(
	{
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
		b2b: {
			type: DataTypes.CHAR
		},
		code: {
			type: DataTypes.STRING
		},
		early_payment_flag: {
			type: DataTypes.CHAR
		},
		edi_seq_no: {
			type: DataTypes.INTEGER
		},
		fws_flag: {
			type: DataTypes.CHAR
		},
		name: {
			type: DataTypes.STRING
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		currency_code: {
			type: DataTypes.STRING
		},
		fax: {
			type: DataTypes.STRING
		},
		phone: {
			type: DataTypes.STRING
		},
		preferred_language: {
			type: DataTypes.STRING
		},
		primary_email: {
			type: DataTypes.STRING
		},
		supplier_detail: {
			type: DataTypes.INTEGER,
		},
		company_registration_number: {
			type: DataTypes.STRING
		},
		default_tax_percentage: {
			type: DataTypes.FLOAT
		},
		digital_inv_flag: {
			type: DataTypes.CHAR
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'supplier',
		tableName: 'supplier',
		schema: 'vms'
	}
);

module.exports = supplier;
