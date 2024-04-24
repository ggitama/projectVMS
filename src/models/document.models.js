const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const documentList = sequelize.define('documentList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
		autoIncrement: true
	},
	po_status: {
		type: DataTypes.STRING
	},
    po_date: {
		type: DataTypes.DATE
	},
    po_revisi: {
		type: DataTypes.STRING
	},
	ra_id: {
		type: DataTypes.STRING
	},
    ra_status: {
		type: DataTypes.STRING
	},
	ra_date: {
		type: DataTypes.DATE
	},
    ra_revisi: {
		type: DataTypes.INTEGER
	},
    rar_id: {
		type: DataTypes.STRING
	},
	rar_status: {
		type: DataTypes.STRING
	},
	rar_date: {
		type: DataTypes.STRING
	},
	rar_revisi: {
		type: DataTypes.STRING
	},
	pfi_id: {
		type: DataTypes.STRING
	},
	pfi_status: {
		type: DataTypes.STRING
	},
	pfi_date: {
		type: DataTypes.DATE
	},
	pfi_revisi: {
		type: DataTypes.STRING
	},
	pfir_id: {
		type: DataTypes.STRING
	},
	pfir_status: {
		type: DataTypes.STRING
	},
	pfir_date: {
		type: DataTypes.DATE
	},
	pfir_revisi: {
		type: DataTypes.STRING
	},
	i_id: {
		type: DataTypes.STRING
	},
	i_status: {
		type: DataTypes.STRING
	},
	i_date: {
		type: DataTypes.DATE
	},
	i_revisi: {
		type: DataTypes.STRING
	},
	url: {
		type: DataTypes.STRING
	},
	ra_url: {
		type: DataTypes.STRING
	},
	rar_url: {
		type: DataTypes.STRING
	},
	pfi_url: {
		type: DataTypes.STRING
	},
	pfir_url: {
		type: DataTypes.STRING
	},
	i_url: {
		type: DataTypes.STRING
	},
	
	
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_DOCUMENT_BERHUBUNGAN_VIEW',
	schema: 'vms',
	timestamps: false
  });

module.exports = documentList;
