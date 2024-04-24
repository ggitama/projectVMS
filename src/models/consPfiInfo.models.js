const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consPfiInfo = sequelize.define('consPfiInfo',
	{
	// Define fields that match the columns in your view
	cdt: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	pfi_number: {
		type: DataTypes.STRING
	},
	tanggal_pfi: {
		type: DataTypes.DATE
	},
    revisi: {
		type: DataTypes.INTEGER
	},
    store: {
		type: DataTypes.STRING
	},
    department: {
		type: DataTypes.STRING
	},
    nama_perusahaan: {
		type: DataTypes.STRING
	},
	alamat_perusahaan: {
		type: DataTypes.STRING
	},
    npwp: {
		type: DataTypes.STRING
	},
    sales_start_date: {
		type: DataTypes.DATE
	},
    sales_end_date: {
		type: DataTypes.DATE
	},
    con_margin_rate: {
		type: DataTypes.INTEGER
	},
    con_margin_value: {
		type: DataTypes.INTEGER
	},
		supplier_code: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
    supplier_phone: {
		type: DataTypes.STRING
	},
    supplier_fax: {
		type: DataTypes.STRING
	},
    pfi_source: {
		type: DataTypes.STRING
	},
    status: {
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
	tableName: 'VMS_CONS_PFI_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = consPfiInfo;
