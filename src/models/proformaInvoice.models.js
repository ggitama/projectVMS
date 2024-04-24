const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const ReceivingAdvice = require('./receivingAdvice.models.js');
const PO = require('./po.models.js');
const ra = require('./receivingAdvice.models.js');
// const PO = require('./po.models.js');

class pfi extends Model {}

pfi.init(
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
		mversion: {
			type: DataTypes.INTEGER
		},
		date_updated: {
			type: DataTypes.DATE
		},
		pro_forma_invoice_date: {
			type: DataTypes.DATE
		},
		dept_code: {
			type: DataTypes.STRING
		},
		receiver_code: {
			type: DataTypes.STRING
		},
		revision: {
			type: DataTypes.INTEGER
		},
		total_amount: {
			type: DataTypes.INTEGER
		},
		status: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_grp_id: {
			type: DataTypes.INTEGER
		},
		receiving_advice: {
			type: DataTypes.INTEGER
		},
		first_approver: {
			type: DataTypes.STRING
		},
		second_approver: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'pro_forma_invoice',
		tableName: 'pro_forma_invoice',
		schema: 'vms'
	}
);

module.exports = pfi;
