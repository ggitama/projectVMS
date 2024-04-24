const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');

class ibtinvoice extends Model {}
ibtinvoice.init({
		iivsitcd: {
			type: DataTypes.STRING,
		},
		iivvencd: {
			type: DataTypes.STRING
		},
		iivinvno: {
			type: DataTypes.STRING,
			primaryKey:true
		},
		iivinvdate: {
			type: DataTypes.DATE
		},
		iivinvrcvdate: {
			type: DataTypes.DATE
		},
		iivnetamt: {
			type: DataTypes.INTEGER
		},
		iivvatamt: {
			type: DataTypes.INTEGER
		},
		iivinvamt: {
			type: DataTypes.INTEGER
		},
		iivordno: {
			type: DataTypes.STRING
		},
		iivorddate: {
			type: DataTypes.DATE
		},
		iivtaxinvno: {
			type: DataTypes.STRING
		},
		iivtaxinvdate: {
			type: DataTypes.DATE
		},
		iivnote: {
			type: DataTypes.CHAR
		},
		iivlgtrate1: {
			type: DataTypes.INTEGER
		},
		iivlgtamt1: {
			type: DataTypes.INTEGER
		},
		iivlgtrate2: {
			type: DataTypes.INTEGER
		},
		iivlgtamt2: {
			type: DataTypes.INTEGER
		},
		iivlgtrate3: {
			type: DataTypes.INTEGER
		},
		iivlgtamt3: {
			type: DataTypes.INTEGER
		},
		iivlgtrate4: {
			type: DataTypes.INTEGER
		},
		iivlgtamt4: {
			type: DataTypes.INTEGER
		},
		iivlgtrate5: {
			type: DataTypes.INTEGER
		},
		iivlgtamt5: {
			type: DataTypes.INTEGER
		},
		iivoptdat: {
			type: DataTypes.DATE
		},
		iivcredat: {
			type: DataTypes.DATE
		},
		iivuptdat: {
			type: DataTypes.STRING
		},
		flag_status: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'ibtinvoice',
		tableName: 'ibtinvoice',
		schema: 'vms'
	},
);

module.exports = ibtinvoice;
