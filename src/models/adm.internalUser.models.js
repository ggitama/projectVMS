const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


//class ResourceView extends Model {}
const intUserList = sequelize.define('intUserList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	first_name: {
		type: DataTypes.STRING
	},
	last_name: {
		type: DataTypes.STRING
	},
	username: {
		type: DataTypes.STRING
	},
	role_id: {
		type: DataTypes.INTEGER
	},
	role: {
		type: DataTypes.STRING
	},
	search: {
		type: DataTypes.STRING
	},
	enabled: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	// email: {
	// 	type: DataTypes.STRING
	// },
	// departemen: {
	// 	type: DataTypes.STRING
	// },
	// store: {
	// 	type: DataTypes.STRING
	// }
	// Other fields...
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_INTUSER3',
	schema: 'vms',
	timestamps: false
  });


module.exports = intUserList;
