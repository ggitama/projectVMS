const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cm_contract extends Model {}
cm_contract.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		contract_code: {
			type: DataTypes.STRING
		},
		contract_end_date: {
			type: DataTypes.DATE
		},
		contract_name: {
			type: DataTypes.STRING
		},
		contract_start_date: {
			type: DataTypes.DATE
		},
		contract_type: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		departement: {
			type: DataTypes.STRING
		},
		holding_supplier_code: {
			type: DataTypes.STRING
		},
		holding_supplier_email1: {
			type: DataTypes.STRING
		},
		holding_supplier_email2: {
			type: DataTypes.STRING
		},
		holding_supplier_email3: {
			type: DataTypes.STRING
		},
		holding_supplier_phone_numeric: {
			type: DataTypes.STRING
		},
		holding_supplier_pic: {
			type: DataTypes.STRING
		},
		holding_supplier_position: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		},
		created_by: {
			type: DataTypes.STRING
		},
		updated_by: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_contract',
		tableName: 'cm_contract',
		schema: 'vms'
	}
);

module.exports = cm_contract;
