const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consLitigasiDetail = sequelize.define('consLitigasiDetail',
	{
	// Define fields that match the columns in your view
	cdt: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	no: {
		type: DataTypes.INTEGER
	},
    barcode: {
		type: DataTypes.STRING
	},
    nama_barang: {
		type: DataTypes.STRING
	},
	field_margin: {
		type: DataTypes.STRING
	},
    field_selling: {
		type: DataTypes.STRING
	},
    field_qty: {
		type: DataTypes.STRING
	},
    margin: {
		type: DataTypes.STRING
	},
    sellingprice: {
		type: DataTypes.STRING
	},
	qty: {
		type: DataTypes.STRING
	},
    dicocokkan_margin: {
		type: DataTypes.STRING
	},
    dicocokkan_selling: {
		type: DataTypes.STRING
	},
    dicocokkan_qty: {
		type: DataTypes.STRING
	},
    remarks_margin: {
		type: DataTypes.STRING
	},
    remarks_selling: {
		type: DataTypes.STRING
	},
    remarks_qty: {
		type: DataTypes.STRING
	},
    sli_id: {
		type: DataTypes.INTEGER
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
	tableName: 'VMS_ANALISIS_PENJUALAN_LIT_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = consLitigasiDetail;