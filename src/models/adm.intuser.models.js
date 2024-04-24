const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


//class ResourceView extends Model {}
const ResourceView = sequelize.define('ResourceView',
	{
	// Define fields that match the columns in your view
	first_name: {
		type: DataTypes.STRING
	},
	last_name: {
		type: DataTypes.STRING
	},
	username: {
		type: DataTypes.STRING
	},

	role: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	departemen: {
		type: DataTypes.STRING
	},
	store: {
		type: DataTypes.STRING
	}
	// Other fields...
  }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_INTUSER2',
	schema: 'vms',
	timestamps: false
  });


module.exports = ResourceView;
