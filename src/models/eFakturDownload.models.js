const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const eFakturDownload = sequelize.define('eFakturList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	file_name: {
		type: DataTypes.STRING
	},
	taxnumber: {
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
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'file_upload_efaktur',
	schema: 'vms',
	timestamps: false
  });

module.exports = eFakturDownload;
