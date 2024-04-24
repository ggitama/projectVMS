const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consPfiDetail = sequelize.define('consPfiDetail',
	{
	// Define fields that match the columns in your view
	cdt: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	no: {
		type: DataTypes.INTEGER
	},
	sales_date: {
		type: DataTypes.DATE
	},
    barcode: {
		type: DataTypes.STRING
	},
    bank_promo: {
		type: DataTypes.STRING
	},
    sales_type: {
		type: DataTypes.STRING
	},
    nama_barang: {
		type: DataTypes.STRING
	},
	sales_qty: {
		type: DataTypes.INTEGER
	},
    selling_price: {
		type: DataTypes.INTEGER
	},
    base_cons_margin: {
		type: DataTypes.INTEGER
	},
    base_cons_payable: {
		type: DataTypes.INTEGER
	},
    support_promo_sup: {
		type: DataTypes.INTEGER
	},
    total_cons_payable: {
		type: DataTypes.INTEGER
	},
	terima: {
		type: DataTypes.STRING
	},
	isactive: {
		type: DataTypes.STRING
	},
	url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_CONS_PFI_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = consPfiDetail;
