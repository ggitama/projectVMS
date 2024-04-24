const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rReqInfo = sequelize.define('rReqInfo',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	rtn_req_number: {
		type: DataTypes.STRING
	},
	rtn_req_date: {
		type: DataTypes.DATE
	},
    department: {
		type: DataTypes.STRING
	},
    toko: {
		type: DataTypes.STRING
	},
    pick_up_location: {
		type: DataTypes.STRING
	},
    kode_supplier: {
		type: DataTypes.STRING
	},
	nama_supplier: {
		type: DataTypes.STRING
	},
    telepon: {
		type: DataTypes.STRING
	},
    fax: {
		type: DataTypes.STRING
	},
    status: {
		type: DataTypes.STRING
	},
	url: {
	type: DataTypes.STRING
}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_REQUEST_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = rReqInfo;
