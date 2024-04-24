const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const approvalPa = sequelize.define('approvalPa',
	{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},	
	pp_number: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	periode_from: {
		type: DataTypes.DATE
	},
    periode_to: {
		type: DataTypes.DATE
	},
    created_date: {
		type: DataTypes.DATE
	},
    status: {
		type: DataTypes.STRING
	},
	agreement_type: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
  //   item_code: {
	// 	type: DataTypes.STRING
	// },
  //   item_name: {
	// 	type: DataTypes.STRING
	// },
  //   promotion_type: {
	// 	type: DataTypes.STRING
	// },
    departement: {
		type: DataTypes.STRING
	},
		contract_code: {
		type: DataTypes.STRING
	},
		contract_name: {
		type: DataTypes.STRING
	}
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'vms_cm_approval',
	schema: 'vms',
	timestamps: false
  });

module.exports = approvalPa;
