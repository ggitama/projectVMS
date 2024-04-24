const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const trfKwitansiDetailPdf = sequelize.define('trfKwitansiDetailPdf',
	{
	// Define fields that match the columns in your view
	tk_id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	business_unit_name: {
		type: DataTypes.STRING
	},
	business_unit_address: {
		type: DataTypes.STRING
	},
    city: {
		type: DataTypes.STRING
	},
    postal_code: {
		type: DataTypes.STRING
	},
	nama_supplier: {
		type: DataTypes.STRING
	},
    nomor_kwitansi: {
		type: DataTypes.STRING
	},
    total_harga: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_TRF_KWITANSI_PDF',
	schema: 'vms',
	timestamps: false
  });

module.exports = trfKwitansiDetailPdf;
