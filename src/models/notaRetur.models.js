const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const nr = sequelize.define('nr',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		retur_number: {
			type: DataTypes.STRING
		},
		rc_number: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_name: {
			type: DataTypes.STRING
		},
		rc_date: {
			type: DataTypes.DATE
		},
		download_date: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.STRING
		},
		business_unit_code: {
			type: DataTypes.STRING
		}
	},
	{
		sequelize,
		tableName: 'VMS_NR',
		schema: 'vms',
		timestamps: false
	},
);

module.exports = nr;
