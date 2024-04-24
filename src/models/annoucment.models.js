const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class annoucment extends Model {}
annoucment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		created_by: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.DATE
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		priority: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		subject: {
			type: DataTypes.STRING
		},
		message: {
			type: DataTypes.STRING
		},
		type: {
			type: DataTypes.STRING
		},
		notif_date: {
			type: DataTypes.DATE
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		post: {
			type: DataTypes.CHAR
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'notification',
		tableName: 'notification',
		schema: 'vms'
	}
);

module.exports = annoucment;
