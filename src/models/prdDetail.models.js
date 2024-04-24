const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const prdDetail = sequelize.define('prdDetail',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	business_unit: {
		type: DataTypes.STRING
	},
	invoice: {
		type: DataTypes.INTEGER
	},
    nomor_order: {
		type: DataTypes.STRING
	},
    store: {
		type: DataTypes.STRING
	},
    jatuh_tempo: {
		type: DataTypes.STRING
	},
    harga: {
		type: DataTypes.INTEGER
	},
	total_harga: {
		type: DataTypes.INTEGER
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PAYMENT_REFERENCE_D_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = prdDetail;
