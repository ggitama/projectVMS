const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const unggahBpfrList = sequelize.define('unggahBpfrList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	namafile: {
		type: DataTypes.STRING
	},
	tanggal_upload: {
		type: DataTypes.DATE
	},
    jumlah_insert: {
		type: DataTypes.INTEGER
	},
    jumlah_revisi: {
		type: DataTypes.INTEGER
	},
	jumlah_gagal: {
		type: DataTypes.INTEGER
	},
    gagal_upload: {
		type: DataTypes.STRING
	},
	// data_file: {
	// 	type: DataTypes.BLOB("long")
	// }
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_UNGGAH_BUKTI_POTONG_FEE_REBATE',
	schema: 'vms',
	timestamps: false
  });

module.exports = unggahBpfrList;
