
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');

class prh extends Model {}
prh.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		access_fee: {
			type: DataTypes.FLOAT
		},
		bank_margin_amount: {
			type: DataTypes.FLOAT
		},
		c4financing_amount: {
			type: DataTypes.FLOAT
		},
		c4fws_id: {
			type: DataTypes.STRING
		},
		c4id: {
			type: DataTypes.STRING
		},
		c4margin_amount: {
			type: DataTypes.FLOAT
		},
		interest_amount: {
			type: DataTypes.FLOAT
		},
		invoice_date: {
			type: DataTypes.DATE
		},
		paid_amount: {
			type: DataTypes.FLOAT
		},
		ps_gross_amount: {
			type: DataTypes.FLOAT
		},
		pymnt_group_cd: {
			type: DataTypes.STRING
		},
		schedule_pay_date: {
			type: DataTypes.DATE
		},
		voucher_id: {
			type: DataTypes.STRING
		},
		payment_reference_header: {
			type: DataTypes.INTEGER
		},
		invoice: {
			type: DataTypes.INTEGER
		},
		invoice_id: {
			type: DataTypes.STRING
		},
		pay_cycle_date: {
			type: DataTypes.DATE
		},
		no_of_days: {
			type: DataTypes.INTEGER
		},
		vendor_id: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'payment_reference_header',
		tableName: 'payment_reference_header',
		schema: 'vms'
	},
	
);

module.exports = prh;
