const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const efList = sequelize.define('efList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	namafile: {
		type: DataTypes.STRING
	},
	nomor_seri_pajak: {
		type: DataTypes.STRING
	},
	upload_date: {
		type: DataTypes.DATE
	},
    download_date: {
		type: DataTypes.DATE
	},
    status: {
		type: DataTypes.STRING
	},
	supp_code: {
		type: DataTypes.STRING
	},
	business_unit_code: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_EF_LIST',
	schema: 'vms',
	timestamps: false
  });

module.exports = efList;
