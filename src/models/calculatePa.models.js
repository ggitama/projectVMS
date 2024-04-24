const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const calculatePa = sequelize.define('calculatePa',
	{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},	
	agreement_type: {
		type: DataTypes.STRING
	},
	agreement_code: {
		type: DataTypes.STRING
	},
	agreement_start_date: {
		type: DataTypes.DATE
	},
    agreement_end_date: {
		type: DataTypes.DATE
	},
    status: {
		type: DataTypes.STRING
	},
    supplier_code: {
		type: DataTypes.STRING
	}
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_CM_CALCULATE',
	schema: 'vms',
	timestamps: false
  });

module.exports = calculatePa;
